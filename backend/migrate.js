import pg from 'pg';
const { Client } = pg;

const connectionString = "postgresql://postgres:Sampath@6139@db.zerfgvpseoatmrvhyrnd.supabase.co:5432/postgres";

const client = new Client({
  connectionString,
});

async function runMigration() {
  try {
    await client.connect();
    console.log("Connected to Supabase DB");

    // Add address column
    await client.query(`ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address text;`);
    console.log("Added address column to profiles table");

    // Create function and trigger
    await client.query(`
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS trigger AS $$
      BEGIN
        INSERT INTO public.profiles (id, full_name, mobile, address, role)
        VALUES (
          new.id,
          new.raw_user_meta_data->>'full_name',
          new.raw_user_meta_data->>'mobile',
          new.raw_user_meta_data->>'address',
          'user'
        );
        RETURN new;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `);
    console.log("Created function handle_new_user");

    // Drop trigger if exists to recreate
    await client.query(`DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;`);
    
    await client.query(`
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    `);
    console.log("Created trigger on_auth_user_created");

  } catch (err) {
    console.error("Error running migration:", err);
  } finally {
    await client.end();
  }
}

runMigration();
