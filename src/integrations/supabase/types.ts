export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      assigned_classes: {
        Row: {
          created_at: string
          enquiry_id: string
          final_tutor_fee: number
          id: string
          platform_fee: number
          platform_percent: number
          status: string
          student_id: string
          total_payment: number
          tutor_id: string
        }
        Insert: {
          created_at?: string
          enquiry_id: string
          final_tutor_fee: number
          id?: string
          platform_fee: number
          platform_percent?: number
          status?: string
          student_id: string
          total_payment: number
          tutor_id: string
        }
        Update: {
          created_at?: string
          enquiry_id?: string
          final_tutor_fee?: number
          id?: string
          platform_fee?: number
          platform_percent?: number
          status?: string
          student_id?: string
          total_payment?: number
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assigned_classes_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assigned_classes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assigned_classes_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiries: {
        Row: {
          created_at: string
          id: string
          level: string | null
          location: string | null
          mode: string
          notes: string | null
          quoted_fee: number
          schedule: string | null
          status: string
          student_id: string
          subject: string
        }
        Insert: {
          created_at?: string
          id?: string
          level?: string | null
          location?: string | null
          mode?: string
          notes?: string | null
          quoted_fee: number
          schedule?: string | null
          status?: string
          student_id: string
          subject: string
        }
        Update: {
          created_at?: string
          id?: string
          level?: string | null
          location?: string | null
          mode?: string
          notes?: string | null
          quoted_fee?: number
          schedule?: string | null
          status?: string
          student_id?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "enquiries_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          class_id: string
          created_at: string
          id: string
          payment_id: string | null
          platform_fee: number
          status: string
          tutor_amount: number
        }
        Insert: {
          amount: number
          class_id: string
          created_at?: string
          id?: string
          payment_id?: string | null
          platform_fee: number
          status?: string
          tutor_amount: number
        }
        Update: {
          amount?: number
          class_id?: string
          created_at?: string
          id?: string
          payment_id?: string | null
          platform_fee?: number
          status?: string
          tutor_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "payments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "assigned_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          amount: number
          class_id: string
          created_at: string
          id: string
          status: string
          tutor_id: string
        }
        Insert: {
          amount: number
          class_id: string
          created_at?: string
          id?: string
          status?: string
          tutor_id: string
        }
        Update: {
          amount?: number
          class_id?: string
          created_at?: string
          id?: string
          status?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payouts_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "assigned_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payouts_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rating: number
          student_id: string
          tutor_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          student_id: string
          tutor_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          student_id?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string
          id: string
          location: string | null
          name: string
          phone: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          name: string
          phone?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          name?: string
          phone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_proposals: {
        Row: {
          availability: string | null
          created_at: string
          enquiry_id: string
          id: string
          message: string | null
          proposed_fee: number
          status: string
          tutor_id: string
        }
        Insert: {
          availability?: string | null
          created_at?: string
          enquiry_id: string
          id?: string
          message?: string | null
          proposed_fee: number
          status?: string
          tutor_id: string
        }
        Update: {
          availability?: string | null
          created_at?: string
          enquiry_id?: string
          id?: string
          message?: string | null
          proposed_fee?: number
          status?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutor_proposals_enquiry_id_fkey"
            columns: ["enquiry_id"]
            isOneToOne: false
            referencedRelation: "enquiries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_proposals_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutors"
            referencedColumns: ["id"]
          },
        ]
      }
      tutors: {
        Row: {
          bio: string | null
          created_at: string
          experience: string | null
          id: string
          location: string | null
          name: string
          rating: number | null
          subjects: string[] | null
          user_id: string
          verification_status: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          experience?: string | null
          id?: string
          location?: string | null
          name: string
          rating?: number | null
          subjects?: string[] | null
          user_id: string
          verification_status?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          experience?: string | null
          id?: string
          location?: string | null
          name?: string
          rating?: number | null
          subjects?: string[] | null
          user_id?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_id: string
          created_at: string
          email: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          auth_id: string
          created_at?: string
          email: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          auth_id?: string
          created_at?: string
          email?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_id: { Args: { _auth_id: string }; Returns: string }
      get_user_role: {
        Args: { _auth_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _auth_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "student" | "tutor" | "admin"
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
    Enums: {
      app_role: ["student", "tutor", "admin"],
    },
  },
} as const
