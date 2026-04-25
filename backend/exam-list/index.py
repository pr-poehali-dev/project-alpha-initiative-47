import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Возвращает список всех сданных экзаменов для проверяющего"""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "SELECT id, full_name, answers, submitted_at FROM exam_submissions ORDER BY submitted_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    submissions = [
        {
            'id': row[0],
            'full_name': row[1],
            'answers': row[2],
            'submitted_at': row[3].isoformat()
        }
        for row in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'submissions': submissions})
    }
