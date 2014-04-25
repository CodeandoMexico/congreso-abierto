import sqlite3

conn = sqlite3.connect('diputados.db')
c = conn.cursor()

#-1 es un voto inexistente, no hay registro o diputado no existia en ese tiempo
def to_matrix():
    c.execute('''select count(v_id) as 'count' from Votacion where tiempo_id=1''')
    row = c.fetchone()
    columns = row[0]

    matrix = []
    l = [-1] * (columns + 1)

    c.execute('''select * from Voto where v_id in (select v_id from Votacion where tiempo_id=1) order by d_id;''')

    last_id = -1
    for row in c:
        if row[0] != last_id:
            matrix.append(l)
            l = [-1] * (columns+1)
            last_id = row[0]
        l[row[1]] = row[2]
    matrix.append(l)
    print matrix

