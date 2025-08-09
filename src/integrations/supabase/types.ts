export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          role?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      student_registrations: {
        Row: {
          admin_comments: string | null
          branch: string | null
          budget: string | null
          class_grade: string
          created_at: string
          custom_subjects: string | null
          district: string
          email: string
          id: string
          languages: string | null
          location: string
          mode: string
          monthly_budget: number | null
          parent_name: string
          phone: string
          preferred_start_date: string | null
          special_requests: string | null
          specialization: string | null
          status: string
          student_name: string
          subjects: string[]
          syllabus: string | null
          time_preference: string | null
          tutor_gender: string | null
          university: string | null
          updated_at: string | null
          urgency: string | null
        }
        Insert: {
          admin_comments?: string | null
          branch?: string | null
          budget?: string | null
          class_grade: string
          created_at?: string
          custom_subjects?: string | null
          district: string
          email: string
          id?: string
          languages?: string | null
          location: string
          mode: string
          monthly_budget?: number | null
          parent_name: string
          phone: string
          preferred_start_date?: string | null
          special_requests?: string | null
          specialization?: string | null
          status?: string
          student_name: string
          subjects: string[]
          syllabus?: string | null
          time_preference?: string | null
          tutor_gender?: string | null
          university?: string | null
          updated_at?: string | null
          urgency?: string | null
        }
        Update: {
          admin_comments?: string | null
          branch?: string | null
          budget?: string | null
          class_grade?: string
          created_at?: string
          custom_subjects?: string | null
          district?: string
          email?: string
          id?: string
          languages?: string | null
          location?: string
          mode?: string
          monthly_budget?: number | null
          parent_name?: string
          phone?: string
          preferred_start_date?: string | null
          special_requests?: string | null
          specialization?: string | null
          status?: string
          student_name?: string
          subjects?: string[]
          syllabus?: string | null
          time_preference?: string | null
          tutor_gender?: string | null
          university?: string | null
          updated_at?: string | null
          urgency?: string | null
        }
        Relationships: []
      }
      subjects: {
        Row: {
          category: string
          id: number
          name: string
        }
        Insert: {
          category: string
          id?: number
          name: string
        }
        Update: {
          category?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      tutor_registrations: {
        Row: {
          admin_comments: string | null
          availability: string
          classes: string[]
          created_at: string
          district: string
          email: string
          experience: number
          full_name: string
          id: string
          languages: string[]
          location: string
          mode: string
          phone: string
          qualification: string
          specialization: string | null
          status: string
          subjects: string[]
          updated_at: string | null
          whatsapp: string | null
        }
        Insert: {
          admin_comments?: string | null
          availability: string
          classes: string[]
          created_at?: string
          district: string
          email: string
          experience: number
          full_name: string
          id?: string
          languages: string[]
          location: string
          mode: string
          phone: string
          qualification: string
          specialization?: string | null
          status?: string
          subjects: string[]
          updated_at?: string | null
          whatsapp?: string | null
        }
        Update: {
          admin_comments?: string | null
          availability?: string
          classes?: string[]
          created_at?: string
          district?: string
          email?: string
          experience?: number
          full_name?: string
          id?: string
          languages?: string[]
          location?: string
          mode?: string
          phone?: string
          qualification?: string
          specialization?: string | null
          status?: string
          subjects?: string[]
          updated_at?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
