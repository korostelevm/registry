#graph_test_node

run command:
```shell
DEBUG=graph_test ./bin/www
```

```
MATCH (a {name: "law 3"}), (b {name: "law 5"}),
p= allShortestPaths((a)-[:related_to*..5]-(b))
return distinct extract(n in nodes(p)| n.name ) as name, 
reduce(sum = 0, n in nodes(p)| sum + case labels(n) when ["Law"] then 1 when ["Keyword"] then 0.5 end) as cost, p order by cost asc
```

```       
MATCH (a {name: "law 3"}), (b {name: "law 5"}),
p= (a)-[:related_to*..5]-(b)
return distinct extract(n in nodes(p)| n.name ) as name, 
reduce(sum = 0, n in nodes(p)| sum + case labels(n) when ["Law"] then 1 when ["Keyword"] then 0.5 end) as cost order by cost asc
```


create relationship and nodes if any dont already exists, if they do, hook up to them
```
MERGE (law:Law {name : 'Speed Law' })
MERGE (a:Keyword { name : 'new word 2', type : 'Keyword', mongo_ref: '0' })
MERGE (a)-[r:related_to]->(law)
RETURN r
```# registry
