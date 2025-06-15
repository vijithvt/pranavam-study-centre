
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const SUBJECT_OPTIONS = [
  // School Subjects
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "Malayalam",
  "Social Science",
  "History",
  "Geography",
  "Political Science",
  "Economics",
  "Computer Science",
  "Accountancy",
  "Business Studies",
  "Psychology",
  "Sociology",
  "Philosophy",
  "Physical Education",
  "Environmental Science",
  // Higher Ed
  "B.Tech", "B.Sc", "B.A", "B.Com", "LLB", "M.Tech", "M.Sc", "M.A", "M.Com",
  // Arts, Entrance
  "Music", "Dance", "Art/Drawing", "Violin (Classical)", "Violin (Western)",
  "NEET", "JEE", "UPSC", "PSC", "Banking", "SSC", "Railway",
];

export default function LearnSearchBox() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const suggestions =
    query.length > 0
      ? SUBJECT_OPTIONS.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6)
      : [];

  const handleSelect = (subject: string) => {
    navigate(`/students?subject=${encodeURIComponent(subject)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSelect(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto mt-10 w-full">
      <div className="flex items-center relative">
        <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          autoFocus
          spellCheck={false}
          placeholder="What do you want to learn? (Eg: Maths, NEET, Drawing...)"
          className="pl-10 pr-4 py-3 rounded-xl shadow-lg !text-lg bg-white border border-gray-200 focus:border-primary/70"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 120)}
        />
      </div>
      {focused && suggestions.length > 0 && (
        <ul className={cn(
          "absolute z-50 left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg py-2 animate-fade-in",
          "max-h-52 overflow-auto"
        )}>
          {suggestions.map((s) => (
            <li
              key={s}
              className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-base"
              onMouseDown={() => handleSelect(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white rounded-lg px-3 py-1.5 text-base shadow hover:bg-primary/90 transition">
        Go
      </button>
    </form>
  );
}
