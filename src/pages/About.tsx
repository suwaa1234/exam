import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto shadow-md">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Тухай</h1>
          <p className="text-gray-600 mb-8 text-center text-lg">Энэхүү апп ReactJS болон Hooks ашиглан бүтээгдсэн.</p>
          <Button className="w-full" size="lg" onClick={() => navigate("/")}>Нүүр хуудас руу буцах</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
