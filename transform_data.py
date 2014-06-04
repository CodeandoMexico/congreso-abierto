# -*- coding: utf-8 -*-
import sqlite3
import json
import os
from random import randint
# from scipy import spatial

conn = sqlite3.connect('diputados.db')
conn.text_factory = str
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
            # temp["value"] = (1 - spatial.distance.cosine(clean_matrix[x],clean_matrix[y])) * 3
            temp["value"] = (1 - spatial.distance.cosine(clean_matrix[x],clean_matrix[y])) * 5 - 2.1
            links.append(temp)

    js = {}
    js["nodes"] = nodes
    js["links"] = links


    print(json.dumps(js))


def diputados_multiples_partidos():
    c.execute('''select nombre, count(*) as c from Diputado Group by nombre having count(*) > 1 order by c DESC''')
    nombres = c.fetchall()
    resultado = []
    for row in nombres:
        temp = {}
        temp["nombre"] = row[0]
        temp["cuantos"] = str(row[1])
        # temp["partidos"] = []
        temp["partidos"] = ""

        c.execute('''select p_id from Diputado where nombre like ?''', (row[0],))
        partidos = c.fetchall()
        for partido in partidos:
            # temp["partidos"].append(partido_id_to_acronym(partido[0])).upper()
            temp["partidos"] = temp["partidos"] + partido_id_to_acronym(partido[0]).upper() + ", "
        temp["partidos"] = temp["partidos"][:-2]
        temp["partidos"] = temp["partidos"][::-1].replace(", "[::-1], " y "[::-1], 1)[::-1]
            
        resultado.append(temp)

    return json.dumps(resultado)

def output_json_files():
    directory = os.path.join(os.getcwd(), 'json')

    if not os.path.exists(directory):
        os.makedirs(directory)

    titulo_4()
    titulo_5()
    titulo_6()
    titulo_7()
    titulo_8()
    titulo_9()
    titulo_10()

def titulo_4():
    with open("json/titulo_4.json", "wt") as out_file:
        out_file.write(top_25_tipo_voto("2","DESC"))

def titulo_5():
    with open("json/titulo_5.json", "wt") as out_file:
        out_file.write(top_25_tipo_voto("2","ASC"))

def titulo_6():
    with open("json/titulo_6.json", "wt") as out_file:
        out_file.write(por_partido_tipo_voto("2"))

def titulo_7():
    with open("json/titulo_7_1.json", "wt") as out_file:
        out_file.write(count_tabla("22","1"))
    with open("json/titulo_7_2.json", "wt") as out_file:
        out_file.write(count_tabla("22","4"))

def titulo_8():
    with open("json/titulo_8_1.json", "wt") as out_file:
        out_file.write(count_tabla("5","1"))
    with open("json/titulo_8_2.json", "wt") as out_file:
        out_file.write(count_tabla("5","4"))

def titulo_9():
    with open("json/titulo_9_1.json", "wt") as out_file:
        out_file.write(count_tabla("2","1"))
    with open("json/titulo_9_2.json", "wt") as out_file:
        out_file.write(count_tabla("2","4"))

def titulo_10():
    with open("json/titulo_10.json", "wt") as out_file:
        out_file.write(diputados_multiples_partidos())

def top_25_tipo_voto(tipo_id, order):
    c.execute(''' select falta_table.d_id, falta_table.count*1.0/asist_table.count as prom, falta_table.count, asist_table.count, asist_table.p_id, asist_table.nombre from (select *, count(*) as count from Voto where tipo_id=? group by d_id) as falta_table, (select *, count(*) as count from Voto, Diputado where Voto.d_id=Diputado.d_id group by Voto.d_id having count >=100 ) as asist_table where falta_table.d_id = asist_table.d_id order by prom ''' + order + " limit 25", (tipo_id, ))

    resultados = []
    for row in c:
        temp = {}
        temp["porcentaje"] = round(row[1]*100,2)
        # temp["porcentaje"] = row[1]*100
        temp["faltas"] = row[2]
        temp["posibles"] = row[3]
        temp["partido"] = partido_id_to_acronym(row[4]).upper()
        temp["nombre"] = row[5]
        resultados.append(temp)

    return json.dumps(resultados)

def por_partido_tipo_voto(tipo_id):
    c.execute(''' select falta_table.count*1.0/asist_table.count as prom, falta_table.count, asist_table.count, asist_table.p_id, Partido.nombre from (select *, count(*) as count from Voto, Diputado where Voto.d_id=Diputado.d_id and tipo_id=? group by p_id) as falta_table, (select *, count(*) as count from Voto, Diputado where Voto.d_id=Diputado.d_id group by p_id ) as asist_table, Partido where Partido.p_id = falta_table.p_id and falta_table.p_id = asist_table.p_id order by prom DESC''', (tipo_id,))

    resultados = []
    for row in c:
        temp = {}
        temp["porcentaje"] = round(row[0]*100,2)
        temp["faltas"] = row[1]
        temp["posibles"] = row[2]
        temp["partido"] = row[4]
        resultados.append(temp)

    return json.dumps(resultados)

def partido_id_to_color(p_id):
    return {
        1: "#e74c3c",
        2: "#2980B9",
        3: "#f1c40f",
        4: "#2ecc71",
        5: "#8E44AD",
        6: "#008080",
        7: 0,
        8: 0,
        9: "#FF8000",
        10: 0,
        11: 0,
        12: 0,
        13: "#FF8000",
    }[p_id]

def partido_id_to_acronym(p_id):
    return {
        1: "pri",
        2: "pan",
        3: "prd",
        4: "pvem",
        5: "pt",
        6: "panal",
        7: "mc",
        8: "sp",
        9: "convergencia",
        10: "pa",
        11: "psn",
        12: "pas",
        13: "cpd",
    }[p_id]

def tipo_id_to_tipo(tipo_id):
    return {
        1: "favor",
        2: "ausente",
        3: "abstencion",
        4: "contra",
        5: "quorum",
    }[tipo_id]

def promedio():
    c.execute('''select Votacion.decreto, Voto.v_id, Diputado.p_id, tipo_id, count(Voto.d_id) as c from Voto, Diputado, Votacion where Voto.d_id=Diputado.d_id and Votacion.v_id=Voto.v_id and Votacion.tiempo_id=1 Group by p_id, tipo_id, Voto.v_id order by Votacion.fecha ASC, Voto.v_id ASC''')

    last_v_id = -1
    resumen = []
    temp = {}

    for row in c:
        if row[1] != last_v_id:
            if last_v_id != -1:
                resumen.append(temp)
            temp = {}
            last_v_id = row[1]

            temp["titulo"] = row[0]
            temp["votos"] = {}
            temp["votos"][tipo_id_to_tipo(row[3])] = {}
            temp["votos"][tipo_id_to_tipo(row[3])][partido_id_to_acronym(row[2])] = row[4]
        else:
            if tipo_id_to_tipo(row[3]) not in temp["votos"]:
                temp["votos"][tipo_id_to_tipo(row[3])] = {}
            temp["votos"][tipo_id_to_tipo(row[3])][partido_id_to_acronym(row[2])] = row[4]

    resumen.append(temp)
    print(resumen)

def count_tabla(tiempo_id, tipo_id):
    c.execute(''' select count(*) from Votacion where tiempo_id=?''',(tiempo_id,))
    for row in c:
        cantidad = row[0]

    c.execute('''select Diputado.p_id from Voto, Votacion,Diputado where Voto.d_id=Diputado.d_id and Voto.v_id=Votacion.v_id and tiempo_id=? group by Diputado.p_id''', (tiempo_id,))
    
    partidos = {}
    partidos_array = []
    for row in c:
        partidos[row[0]] = {}
        partidos[row[0]]["name"] = partido_id_to_acronym(row[0]).upper()
        if partido_id_to_color(row[0]):
            partidos[row[0]]["color"] = partido_id_to_color(row[0]) 
        partidos[row[0]]["data"] = [0] * cantidad
        partidos_array.append(partidos[row[0]])

    # c.execute('''select Voto.v_id, Diputado.p_id, tipo_id, count(Voto.d_id) as c from Voto, Diputado, Votacion where Voto.d_id=Diputado.d_id and Votacion.v_id=Voto.v_id and Votacion.tiempo_id=2 and tipo_id=4 Group by p_id, tipo_id, Voto.v_id order by Votacion.fecha ASC, Voto.v_id ASC ,Diputado.p_id ASC''')
    c.execute(''' select Votacion.v_id,t.p_id,t.tipo_id,t.c from Votacion LEFT JOIN (
            select Voto.v_id, Diputado.p_id, tipo_id, count(Voto.d_id) as c 
            from Voto, Diputado, Votacion 
            where Voto.d_id=Diputado.d_id and Votacion.v_id=Voto.v_id and Votacion.tiempo_id=? and tipo_id=? 
            Group by p_id, tipo_id, Voto.v_id 
            order by Votacion.fecha ASC, Voto.v_id ASC ,Diputado.p_id ASC) as t on Votacion.v_id = t.v_id where Votacion.tiempo_id=?''', (tiempo_id, tipo_id, tiempo_id))

    last_v_id = -1

    i = 0

    for row in c:
        if row[0] != last_v_id:
            if last_v_id != -1:
                i = i + 1
            last_v_id = row[0]
        if row[3]:
            partidos[row[1]]["data"][i] = row[3]
        else:
            partidos[1]["data"][i] = 0 


    return json.dumps(partidos_array)



# to_matrix()
# promedio()
# diputados_multiples_partidos()
output_json_files()
# por_partido_ausentes()
# count_tabla()
