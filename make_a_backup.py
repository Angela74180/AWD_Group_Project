import sqlite3
import os

def backup_sqlite(db_path, output_sql):
     conn = sqlite3.connect(db_path)
     conn.row_factory = sqlite3.Row
     cur = conn.cursor()

     with open(output_sql, "w", encoding="utf-8") as f:
         # Get all user tables
         cur.execute("""
             SELECT name FROM sqlite_master
             WHERE type='table' AND name NOT LIKE 'sqlite_%' and name not like 'alembic_version'
         """)
         tables = [row["name"] for row in cur.fetchall()]

         for table in tables:
             # Get column names
             cur.execute(f"PRAGMA table_info({table})")
             cols = [row["name"] for row in cur.fetchall()]
             col_list = ", ".join([f'"{c}"' for c in cols])

             # Dump rows
             cur.execute(f"SELECT * FROM {table}")
             rows = cur.fetchall()

             for row in rows:
                 values = []
                 for c in cols:
                     v = row[c]
                     if v is None:
                         values.append("NULL")
                     else:
                         # Escape single quotes
                         v = str(v).replace("'", "''")
                         values.append(f"'{v}'")

                 value_list = ", ".join(values)
                 f.write(f"INSERT INTO \"{table}\" ({col_list}) VALUES ({value_list});\n")

     conn.close()
     print(f"Backup written to {output_sql}")


if __name__ == "__main__":
     backup_sqlite("app.db", "restore_backup.sql")


