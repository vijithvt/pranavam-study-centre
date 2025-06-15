
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetch subjects from the database and group by category.
 */
export function useSubjects() {
  const query = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select("id, name, category")
        .order("category", { ascending: true })
        .order("name", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  // Group by category
  let grouped: { [category: string]: { id: number; name: string }[] } = {};
  if (query.data) {
    for (const row of query.data) {
      if (!grouped[row.category]) grouped[row.category] = [];
      grouped[row.category].push({ id: row.id, name: row.name });
    }
  }

  // Human-friendly group names
  const categoryLabels: { [key: string]: string } = {
    school: "School Subjects",
    professional: "Professional Courses",
    entrance: "Entrance Exam Preparation",
    arts: "Arts & Music",
  };

  // Sorting categories as per your form
  const sortedCategories = ["school", "professional", "entrance", "arts"];

  return {
    ...query,
    grouped,
    categoryLabels,
    sortedCategories,
  };
}
