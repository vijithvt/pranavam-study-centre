import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import SubjectClassPickerModal from "./SubjectClassPickerModal";

const SUBJECT_OPTIONS = [
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
  "B.Tech", "B.Sc", "B.A", "B.Com", "LLB", "M.Tech", "M.Sc", "M.A", "M.Com",
  "Music", "Dance", "Art/Drawing", "Violin (Classical)", "Violin (Western)",
  "NEET", "JEE", "UPSC", "PSC", "Banking", "SSC", "Railway",
];

export default function LearnSearchBox() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [subjectPicked, setSubjectPicked] = useState<string>("");

  const suggestions =
    query.length > 0
      ? SUBJECT_OPTIONS.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6)
      : [];

  const handleSelect = (subject: string) => {
    setSubjectPicked(subject);
    setPickerOpen(true); // instead of redirecting, show class picker if needed
  };

  const handleModalPick = (pickedClass: string) => {
    setPickerOpen(false);
    // Encode subject and class as URL query params
    let url = "/students";
    if (subjectPicked) {
      url += "?subject=" + encodeURIComponent(subjectPicked);
      if (pickedClass) url += "&class=" + encodeURIComponent(pickedClass);
    }
    navigate(url);
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (query.trim()) handleSelect(query.trim());
        }}
        className="relative w-full max-w-xl mx-auto mt-14"
        autoComplete="off"
      >
        <div className="flex items-center relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6 pointer-events-none"
          />
          <Input
            type="text"
            autoFocus
            spellCheck={false}
            placeholder="What do you want to learn? (Eg: Maths, NEET, Drawing...)"
            className={cn(
              "pl-14 pr-6 py-5 rounded-2xl text-xl shadow-xl bg-white border border-primary/20 focus:border-primary/60 transition-all duration-200 ease-out outline-none",
              "focus:shadow-lg focus:bg-primary/5 focus:ring-2 focus:ring-primary/20",
              "font-semibold placeholder:font-normal"
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 140)}
            style={{ minHeight: "54px" }}
            aria-label="What do you want to learn"
          />
        </div>
        {focused && suggestions.length > 0 && (
          <ul
            className={cn(
              "absolute z-50 left-0 right-0 mt-2 bg-white border border-primary/20 rounded-2xl shadow-2xl py-2 animate-fade-in",
              "max-h-56 overflow-auto",
            )}
            style={{
              // ensure dropdown sits above hero or any section
              minWidth: "100%",
            }}
          >
            {suggestions.map((s) => (
              <li
                key={s}
                className={cn(
                  "px-5 py-3 cursor-pointer text-lg rounded-xl transition-all",
                  "hover:bg-primary/10 hover:text-primary font-medium",
                  "focus-visible:bg-primary/10 focus-visible:text-primary outline-none",
                  "truncate",
                )}
                style={{
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                  // ensure readability for long text
                  maxWidth: "100%",
                }}
                tabIndex={0}
                onMouseDown={() => handleSelect(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white rounded-xl px-6 py-2 text-lg font-bold shadow hover:bg-primary/90 transition-all duration-200"
          style={{
            minWidth: 64,
            boxShadow: "0 2px 8px rgba(59,130,246,0.07)",
          }}
        >
          Go
        </button>
      </form>
      <SubjectClassPickerModal
        open={pickerOpen}
        subject={subjectPicked}
        onPick={handleModalPick}
        onClose={() => setPickerOpen(false)}
      />
    </>
  );
}
