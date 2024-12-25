// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri_plugin_sql::{Migration, MigrationKind};

fn main() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: r#"
        CREATE TABLE IF NOT EXISTS chat_message (
          content TEXT NOT NULL,
          conversation_id TEXT NOT NULL,
          is_group_chat BOOLEAN NOT NULL,
          message_id TEXT NOT NULL,
          message_type INT NOT NULL,
          sender_id TEXT NOT NULL,
          sentiment_analysis_result TEXT NOT NULL,
          timestamp INT NOT NULL
        )
        "#,
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:mydatabase.db", migrations)
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// async fn init_db() -> Result<sqlx::Pool<sqlx::Sqlite>, sqlx::Error> {
//   let db_path = "ftchat.db";
//   let pool = SqlitePoolOptions::new()
//     .max_connections(1)
//     .connect(&format!("sqlite://{}", db_path))
//     .await?;
//   pool.execute(
//     r#"
//     CREATE TABLE IF NOT EXISTS chat_message (
//       content TEXT NOT NULL,
//       conversation_id TEXT NOT NULL,
//       is_group_chat BOOLEAN NOT NULL,
//       message_id TEXT NOT NULL,
//       message_type INT NOT NULL,
//       sender_id TEXT NOT NULL,
//       sentiment_analysis_result TEXT NOT NULL,
//       timestamp INT NOT NULL
//     )
//     "#
//   )
//   .await?;

//   Ok(pool)
// }
