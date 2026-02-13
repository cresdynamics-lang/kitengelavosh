'use client'

import { useState, useEffect } from 'react'
import styles from './admin.module.css'

interface MassSermon {
  id: number
  title: string
  description: string
  speaker: string
  date: string
  video_url: string
  audio_url: string
  thumbnail_url: string
  duration: number
  views: number
}

export default function MassSermons() {
  const [sermons, setSermons] = useState<MassSermon[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    speaker: '',
    date: '',
    video_url: '',
    audio_url: '',
    thumbnail_url: '',
    duration: ''
  })

  useEffect(() => {
    fetchSermons()
  }, [])

  const fetchSermons = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/admin/mass-sermons`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.success) {
        setSermons(data.data)
      }
    } catch (error) {
      console.error('Error fetching sermons:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    
    try {
      const url = editingId 
        ? `${apiUrl}/api/admin/mass-sermons/${editingId}`
        : `${apiUrl}/api/admin/mass-sermons`
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          duration: formData.duration ? parseInt(formData.duration) : null
        })
      })

      const data = await response.json()
      if (data.success) {
        fetchSermons()
        resetForm()
      } else {
        alert(data.error || 'Failed to save sermon')
      }
    } catch (error) {
      alert('Error saving sermon')
    }
  }

  const handleEdit = (sermon: MassSermon) => {
    setFormData({
      title: sermon.title,
      description: sermon.description || '',
      speaker: sermon.speaker || '',
      date: sermon.date,
      video_url: sermon.video_url || '',
      audio_url: sermon.audio_url || '',
      thumbnail_url: sermon.thumbnail_url || '',
      duration: sermon.duration?.toString() || ''
    })
    setEditingId(sermon.id)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this sermon?')) return
    
    try {
      const token = localStorage.getItem('adminToken')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/admin/mass-sermons/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.success) {
        fetchSermons()
      }
    } catch (error) {
      alert('Error deleting sermon')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      speaker: '',
      date: '',
      video_url: '',
      audio_url: '',
      thumbnail_url: '',
      duration: ''
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) return <div className={styles.loading}>Loading...</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Mass Sermons</h2>
        <button onClick={() => setShowForm(true)} className={styles.addButton}>
          + Add New Sermon
        </button>
      </div>

      {showForm && (
        <div className={styles.formModal}>
          <div className={styles.formContent}>
            <h3>{editingId ? 'Edit' : 'Add'} Mass Sermon</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Speaker</label>
                  <input
                    type="text"
                    value={formData.speaker}
                    onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Video URL</label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Audio URL</label>
                <input
                  type="url"
                  value={formData.audio_url}
                  onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Thumbnail URL</label>
                  <input
                    type="url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>Save</button>
                <button type="button" onClick={resetForm} className={styles.cancelButton}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Speaker</th>
              <th>Date</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sermons.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>No sermons found</td>
              </tr>
            ) : (
              sermons.map((sermon) => (
                <tr key={sermon.id}>
                  <td>{sermon.title}</td>
                  <td>{sermon.speaker || '-'}</td>
                  <td>{new Date(sermon.date).toLocaleDateString()}</td>
                  <td>{sermon.views}</td>
                  <td>
                    <button onClick={() => handleEdit(sermon)} className={styles.editButton}>Edit</button>
                    <button onClick={() => handleDelete(sermon.id)} className={styles.deleteButton}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
