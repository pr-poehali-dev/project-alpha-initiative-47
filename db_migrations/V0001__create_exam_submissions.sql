CREATE TABLE exam_submissions (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  answers JSONB NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW()
);