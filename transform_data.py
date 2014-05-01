import sqlite3
import json
from random import randint
from scipy import spatial

conn = sqlite3.connect('diputados.db')
c = conn.cursor()

#-1 es un voto inexistente, no hay registro o diputado no existia en ese tiempo
def to_matrix():
    c.execute('''select count(v_id) as 'count' from Votacion where tiempo_id=1''')
    row = c.fetchone()
    columns = row[0]

    matrix = []
    diputados = []
    diputados_partido = []
    l = [-1] * (columns + 1)

    c.execute('''select * from Voto, Diputado where Voto.d_id = Diputado.d_id and v_id in (select v_id from Votacion where tiempo_id=1) order by d_id;''')

    last_id = -1
    last_partido = -1
    for row in c:
        if row[0] != last_id:
            matrix.append(l)
            diputados.append(last_id)
            diputados_partido.append(last_partido)
            l = [-1] * (columns+1)
            last_id = row[0]
            last_partido = row[5]
        l[row[1]] = row[2]
    matrix.append(l)

    clean_matrix = []
    clean_diputados = []
    clean_partidos = []

    for x, row in enumerate(matrix):
        row.pop(0)
        if -1 not in row:
            if randint(0,20) < 5:
                clean_matrix.append(row)
                clean_diputados.append(diputados[x])
                clean_partidos.append(diputados_partido[x])

    nodes = []
    links = []

    for x in range(0,len(clean_matrix)):
        node = {}
        node["name"] = str(clean_diputados[x]).zfill(3)
        node["group"] = clean_partidos[x]

        nodes.append(node)

        for y in range(x+1,len(clean_matrix)):
            temp = {}
            temp["source"] = x
            temp["target"] = y
            temp["value"] = (1 - spatial.distance.cosine(clean_matrix[x],clean_matrix[y])) * 3
            links.append(temp)

    js = {}
    js["nodes"] = nodes
    js["links"] = links


    print json.dumps(js)



    # print clean_matrix
    # print len(clean_matrix)
    # print len(clean_diputados)

to_matrix()
