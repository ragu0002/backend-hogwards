## Forklaring av mine endpoints

##### Her forklarer jeg de forskjellige endpointesene mine! Jeg tar ikke students, houses, teachers men heller et mønster for eksempel all data fra en tabell osv..

##### Til courses har jeg skrevet det for seg selv fordi det er litt andeledes. Jeg nåede kun å hente alle courses og å hente et enkelt cours.

---

#### GET all `/houses` (houses, teachers, students)

##### - Finn alle husene i houses tabellen

##### - Hvis det er hus send tilbake med status 200

##### - Hvis det oppstår en datafeil får man status 500

---

#### GET all `/courses`

##### - Finn alle kursene i courses tabellen

##### - Finn alle studentene i students tabellen

##### - Finn id fra student_courses tabellen

##### - Sette inn riktige studenter til riktige kurs

##### - Hvis det er kurs sender man disse med tilsvarende studenter med status 200

##### - Hvis det oppstår en datafeil får man status 500

---

#### GET one `/courses/:id`

##### - Finn id fra requesten

##### - Finn alle kursene i courses tabellen

##### - Finn alle studentene i students tabellen

##### - Finn id fra student_courses tabellen

##### - Sette inn riktige studenter til det riktige kurset

##### - Hvis det er kurs sender man disse med tilsvarende studenter med status 200

##### - Hvis kurset ikke finnes får man status 404

##### - Hvis det oppstår en datafeil får man status 500

---

#### GET one `/houses/:id` (houses, teachers, students)

##### - Finn id fra requesten

##### - Finn huset med tilsvarende id

##### - Sende tilbake huset med status 200

##### - Hvis huset ikke finnes får man en staus 404

##### - Hvis det oppstår en datafeil får man status 500

---

#### POST `/teachers/` (teachers, students)

##### - Finn infromasjonen til den nye læreren fra requesten

##### - Send informasjonen inn til databasen

##### - Sende tilbake læreren som nettop ble opprettet med status 200

##### - Hvis læreren ikke finnes får man en staus 404

##### - Hvis det oppstår en datafeil får man status 500

---

#### DELETE one `/teachers/:id` (teachers, students)

##### - Finn id fra requesten

##### - Finn læreren med tilsvarende id

##### - Hvis læreren ble slettet sender man tilbake status 200

##### - Hvis læreren ikke finnes får man en staus 404

##### - Hvis det oppstår en datafeil får man status 500

---

#### PUT one`/teachers/:id` (teachers, students)

##### - Finn id og informasjonen som skal oppdateres fra requesten

##### - Finn læreren med tilsvarende id

##### - Hvis læreren ble oppdatert sender man tilbake status 200

##### - Hvis læreren ikke finnes får man en staus 404

##### - Hvis det oppstår en datafeil får man status 500
