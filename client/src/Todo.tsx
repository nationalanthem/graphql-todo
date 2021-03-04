import { useState } from 'react'
import './Todo.css'

interface Props {
  title: string
  onDelete: () => void
  onUpdate: (title: string) => void
}

export default function Todo({ title, onDelete, onUpdate }: Props) {
  const [editMode, setEditMode] = useState(false)
  const [newTitle, setNewTitle] = useState(title)

  return (
    <div className="todo">
      {!editMode ? (
        <>
          <p onClick={() => setEditMode(true)}>{title}</p>
          <span onClick={onDelete} className="todo-delete">
            x
          </span>
        </>
      ) : (
        <>
          <input onChange={(e) => setNewTitle(e.target.value)} value={newTitle} type="text" />
          <button
            onClick={() => {
              onUpdate(newTitle)
              setEditMode(false)
            }}
          >
            Обновить
          </button>
        </>
      )}
    </div>
  )
}
