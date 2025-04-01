import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Note } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const navigate = useNavigate();

  // Load notes from localStorage when component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(Array.isArray(parsedNotes) ? parsedNotes : []);
      } catch (error) {
        console.error('Error parsing notes:', error);
        setNotes([]);
      }
    } else {
      localStorage.setItem('notes', JSON.stringify([]));
      setNotes([]);
    }
  }, []);

  // Save notes to localStorage whenever notes state changes
  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  }, [notes]);

  // Handle adding a new note
  const handleAddNote = () => {
    if (newNoteTitle.trim() === '') return;
    
    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: '',
      createdAt: new Date().toISOString(),
    };
    
    setNotes([...notes, newNote]);
    setNewNoteTitle('');
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Тэмдэглэлийн Жагсаалт</h1>
      
      {/* Add new note form */}
      <div className="mb-8 flex gap-3 max-w-2xl mx-auto">
        <Input
          type="text"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          placeholder="Тэмдэглэлийн гарчиг"
        />
        <Button onClick={handleAddNote}>Тэмдэглэл нэмэх</Button>
      </div>

      {/* Notes list */}
      {notes.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Гарчиг</TableHead>
                <TableHead>Огноо</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notes.map((note) => (
                <TableRow 
                  key={note.id} 
                  onClick={() => navigate(`/note/${note.id}`)} 
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{note.title}</TableCell>
                  <TableCell>{formatDate(note.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">Тэмдэглэл байхгүй байна. Шинэ тэмдэглэл нэмнэ үү.</p>
      )}
    </div>
  );
}