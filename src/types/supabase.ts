export type Json = string | number | boolean | null | {[key: string]: Json | undefined} | Json[];

export interface Database {
  public: {
    Tables: {
      artistDetail: {
        Row: {
          album: Json | null;
          artist: string;
          community_banner: string | null;
          community_button: string | null;
          cover: string | null;
          id: number;
          info: Json | null;
          musicVideo: string | null;
          photo: Json | null;
          profile: Json | null;
        };
        Insert: {
          album?: Json | null;
          artist: string;
          community_banner?: string | null;
          community_button?: string | null;
          cover?: string | null;
          id?: number;
          info?: Json | null;
          musicVideo?: string | null;
          photo?: Json | null;
          profile?: Json | null;
        };
        Update: {
          album?: Json | null;
          artist?: string;
          community_banner?: string | null;
          community_button?: string | null;
          cover?: string | null;
          id?: number;
          info?: Json | null;
          musicVideo?: string | null;
          photo?: Json | null;
          profile?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: 'artistDetail_artist_fkey';
            columns: ['artist'];
            isOneToOne: true;
            referencedRelation: 'artists';
            referencedColumns: ['artist'];
          },
        ];
      };
      artists: {
        Row: {
          artist: string;
          artist_fw_count: number | null;
          id: number;
          photo_url: string | null;
          user_likes: Json | null;
        };
        Insert: {
          artist: string;
          artist_fw_count?: number | null;
          id?: number;
          photo_url?: string | null;
          user_likes?: Json | null;
        };
        Update: {
          artist?: string;
          artist_fw_count?: number | null;
          id?: number;
          photo_url?: string | null;
          user_likes?: Json | null;
        };
        Relationships: [];
      };
      followers: {
        Row: {
          follower_count: number | null;
          follower_id: Json;
          following_count: number | null;
          following_id: Json;
        };
        Insert: {
          follower_count?: number | null;
          follower_id?: Json;
          following_count?: number | null;
          following_id?: Json;
        };
        Update: {
          follower_count?: number | null;
          follower_id?: Json;
          following_count?: number | null;
          following_id?: Json;
        };
        Relationships: [];
      };
      postComments: {
        Row: {
          comment: string | null;
          commentid: string;
          created_at: string;
          isEditing: boolean | null;
          postid: string;
          userid: string | null;
        };
        Insert: {
          comment?: string | null;
          commentid?: string;
          created_at?: string;
          isEditing?: boolean | null;
          postid: string;
          userid?: string | null;
        };
        Update: {
          comment?: string | null;
          commentid?: string;
          created_at?: string;
          isEditing?: boolean | null;
          postid?: string;
          userid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'postComments_userid_fkey';
            columns: ['userid'];
            isOneToOne: false;
            referencedRelation: 'userinfo';
            referencedColumns: ['id'];
          },
        ];
      };
      postLike: {
        Row: {
          id: string;
          like: number;
          postid: string;
          userid: Json | null;
        };
        Insert: {
          id?: string;
          like?: number;
          postid?: string;
          userid?: Json | null;
        };
        Update: {
          id?: string;
          like?: number;
          postid?: string;
          userid?: Json | null;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          artist: string | null;
          content: string | null;
          created_at: string;
          id: string;
          isEditing: boolean | null;
          photo_url: Json | null;
          userid: string | null;
          username: string | null;
        };
        Insert: {
          artist?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          isEditing?: boolean | null;
          photo_url?: Json | null;
          userid?: string | null;
          username?: string | null;
        };
        Update: {
          artist?: string | null;
          content?: string | null;
          created_at?: string;
          id?: string;
          isEditing?: boolean | null;
          photo_url?: Json | null;
          userid?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'posts_artist_fkey';
            columns: ['artist'];
            isOneToOne: false;
            referencedRelation: 'artists';
            referencedColumns: ['artist'];
          },
          {
            foreignKeyName: 'posts_userid_fkey';
            columns: ['userid'];
            isOneToOne: false;
            referencedRelation: 'userinfo';
            referencedColumns: ['id'];
          },
        ];
      };
      schedule: {
        Row: {
          artist: string;
          date: string | null;
          id: number;
          place: string | null;
          title: string | null;
        };
        Insert: {
          artist: string;
          date?: string | null;
          id?: number;
          place?: string | null;
          title?: string | null;
        };
        Update: {
          artist?: string;
          date?: string | null;
          id?: number;
          place?: string | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'schedule_artist_fkey';
            columns: ['artist'];
            isOneToOne: false;
            referencedRelation: 'artists';
            referencedColumns: ['artist'];
          },
        ];
      };
      userinfo: {
        Row: {
          artist_follow: Json | null;
          email: string;
          id: string;
          profile_image: Json | null;
          username: string;
        };
        Insert: {
          artist_follow?: Json | null;
          email: string;
          id: string;
          profile_image?: Json | null;
          username: string;
        };
        Update: {
          artist_follow?: Json | null;
          email?: string;
          id?: string;
          profile_image?: Json | null;
          username?: string;
        };
        Relationships: [];
      };
      userSchedule: {
        Row: {
          artist: string | null;
          created_at: string;
          date: string | null;
          id: string;
          place: string | null;
          scheduleId: number | null;
          title: string | null;
          userid: string | null;
        };
        Insert: {
          artist?: string | null;
          created_at?: string;
          date?: string | null;
          id?: string;
          place?: string | null;
          scheduleId?: number | null;
          title?: string | null;
          userid?: string | null;
        };
        Update: {
          artist?: string | null;
          created_at?: string;
          date?: string | null;
          id?: string;
          place?: string | null;
          scheduleId?: number | null;
          title?: string | null;
          userid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'userSchedule_userid_fkey';
            columns: ['userid'];
            isOneToOne: false;
            referencedRelation: 'userinfo';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
  ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | {schema: keyof Database},
  TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | {schema: keyof Database},
  EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
