```yaml
parameters:
  - name: pageSize
    in: query
    description: Number of persons returned
    type: integer
  - name: pageNumber
    in: query
    description: Page number
    type: integer
```


```yaml
parameters:
  - $ref: "#/parameters/pageSize"
  - $ref: "#/parameters/pageNumber"
```