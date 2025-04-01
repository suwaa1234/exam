import { useState, useEffect } from "react";
import { Note } from "../types";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Home = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() || !content.trim()) return;
    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      date: new Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Тэмдэглэлүүд</h1>
      <Card className="mb-8 max-w-2xl mx-auto shadow-md">
        <CardContent className="p-4">
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Гарчиг" 
            className="mb-4"
          />
          <Textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Тэмдэглэл..." 
            className="mb-4 min-h-[120px]"
          />
          <Button 
            className="w-full" 
            size="lg"
            onClick={addNote}
          >
            Тэмдэглэл нэмэх
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4 max-w-2xl mx-auto">
        {notes.map((note) => (
          <Link key={note.id} to={`/note/${note.id}`}>
            <Card className="hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary/20">
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <p className="text-sm text-gray-500">{note.date}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
