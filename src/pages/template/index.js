'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Eye } from 'lucide-react'
import Link from 'next/link'
import DeleteIcon from '@mui/icons-material/Delete'

export default function AdminPage() {
  const [links, setLinks] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingLink, setEditingLink] = useState(null)
  const [username, setUsername] = useState("")
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')

  // Fetch links for the current username
  const fetchLinks = async () => {
    if (!username) return;

    try {
      const response = await fetch(`/api/socialLinks?username=${username}`);
      
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data = await response.json();

      if (data.message) {
        console.error(data.message);
        return;
      }

      setLinks(data);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  // Handle form submission for adding new links
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLink = { url, title, username };
    try {
      const response = await fetch('/api/socialLinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLink),
      });

      if (response.ok) {
        setUrl('');
        setTitle('');
        setShowAddForm(false);
        fetchLinks(); // Re-fetch the links after adding
      }
    } catch (error) {
      console.error('Error submitting link:', error);
    }
  };

  // Handle edit submission
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/socialLinks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: editingLink.url,
          title: editingLink.title,
        }),
      });

      if (response.ok) {
        setEditingLink(null);
        fetchLinks(); // Re-fetch the links after editing
      }
    } catch (error) {
      console.error('Error editing link:', error);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/socialLinks?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchLinks(); // Re-fetch the links after deleting
      }
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  };

  // Retrieve stored username from localStorage when component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Re-fetch links when username changes
  useEffect(() => {
    if (username) fetchLinks();
  }, [username]);
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Link Management</h1>
          <div className="flex gap-4">
          <Link 
            href={`/${username}`} // Redirects to domain.com/username
            target="_blank"
            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
            <Eye size={20} />
            Preview
        </Link>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              <Plus size={20} />
              Add Link
            </button>
          </div>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmit} className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Add New Link</h2>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium">URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-md border p-2"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {links.map((link) => (
            <div
              key={link._id}
              className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md"
            >
              {editingLink?._id === link._id ? (
                <form onSubmit={handleEdit} className="flex w-full items-center gap-4">
                  <input
                    type="text"
                    value={editingLink.title}
                    onChange={(e) =>
                      setEditingLink({ ...editingLink, title: e.target.value })
                    }
                    className="flex-1 rounded-md border p-2"
                    required
                  />
                  <input
                    type="url"
                    value={editingLink.url}
                    onChange={(e) =>
                      setEditingLink({ ...editingLink, url: e.target.value })
                    }
                    className="flex-1 rounded-md border p-2"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingLink(null)}
                      className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div>
                    <h3 className="font-medium">{link.title}</h3>
                    <p className="text-sm text-gray-500">{link.url}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingLink(link)}
                      className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 hover:bg-gray-200"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(link._id)}
                      className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                      <DeleteIcon size={16} />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
