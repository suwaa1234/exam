import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Note } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const savedNotes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
    const foundNote = savedNotes.find((n) => n.id === id);
    if (foundNote) setNote(foundNote);
  }, [id]);

  const updateNote = () => {
    if (!note) return;
    const savedNotes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
    const updatedNotes = savedNotes.map((n) => (n.id === note.id ? note : n));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    navigate("/");
  };

  return note ? (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Тэмдэглэлийн Дэлгэрэнгүй</h1>
          <Input 
            className="mb-4" 
            value={note.title} 
            onChange={(e) => setNote({ ...note, title: e.target.value })} 
            placeholder="Гарчиг"
          />
          <Textarea 
            className="mb-6 min-h-[200px]" 
            value={note.content} 
            onChange={(e) => setNote({ ...note, content: e.target.value })} 
            placeholder="Тэмдэглэл..."
          />
          <div className="flex gap-3 justify-end">
            <Button onClick={updateNote}>Хадгалах</Button>
            <Button variant="outline" onClick={() => navigate("/")}>Буцах</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : (
    <p className="text-center text-lg">Тэмдэглэл олдсонгүй!</p>
  );
};

export default NoteDetail;
