export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_type: 'mentor' | 'mentee' | 'admin'
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          achievements: string[] | null
          expertise: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_type: 'mentor' | 'mentee' | 'admin'
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          achievements?: string[] | null
          expertise?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_type?: 'mentor' | 'mentee' | 'admin'
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          achievements?: string[] | null
          expertise?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          author_id: string
          title: string
          content: string
          media_urls: string[] | null
          media_types: string[] | null
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          title: string
          content: string
          media_urls?: string[] | null
          media_types?: string[] | null
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          title?: string
          content?: string
          media_urls?: string[] | null
          media_types?: string[] | null
          category?: string
          created_at?: string
          updated_at?: string
        }
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

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]