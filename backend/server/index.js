const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//creates the connection to the data base 
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "discovery",
});

app.post("/registration", (req, res) => {

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const user = req.body.user

    db.query(
        "INSERT INTO login (username, email, password, user) VALUES (?,?,?,?)",
        [username, email, password, user],
        (err, result) => {
            res.send(err)
        }
    );
});

app.post("/Login", (req, res) => {

    const email = req.body.email
    const password = req.body.password

    db.query(
        "SELECT * FROM login WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong email or password!" });
            }
        }
    );
});

app.post("/eventmaker", (req, res) => {

    const title = req.body.title
    const description = req.body.description
    const location = req.body.location
    const time = req.body.time
    const date = req.body.date
    const host = req.body.host
    const invite = req.body.invite
    const lat = req.body.latitude
    const lng = req.body.longitude
    const timenum = req.body.timenum
    const datenum = req.body.datenum

    db.query(
        "INSERT INTO events (title, description, location, time, date, host, count, invite, lat, lng, timenum, datenum) VALUES (?,?,?,?,?,?,0,?,?,?,?,?)",
        [title, description, location, time, date, host, invite, lat, lng, timenum, datenum],
        (err, result) => {
            res.send(err)
        }
    );
});

app.get("/get", (req, res) => {
    const sqlSelect = "SELECT * from events";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/getd", (req, res) => {
    const id = req.body.identity
    db.query("SELECT * FROM events WHERE id = ?",
    [id],
    (err, result) => {
        res.send(result);
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM events WHERE id = ?",
    [id],
    (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});

app.post("/update", (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const description = req.body.description
    const location = req.body.location
    const time = req.body.time
    const date = req.body.date
    const lat = req.body.lat
    const lng = req.body.lng
    const invite = req.body.invite
    const timenum = req.body.timenum
    const datenum = req.body.datenum
    db.query("UPDATE events SET title = ?, description = ?, location = ?, time = ?, date = ?, lat = ?, lng = ?, invite = ?, timenum = ?, datenum = ? WHERE id = ?",
    [title, description, location, time, date, lat, lng, invite, timenum, datenum, id],
    (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});

app.post("/rsvpevent", (req, res) => {
    const eventid = req.body.eventid
    const email = req.body.email
    const status = req.body.status
    const date = req.body.date
    const time = req.body.time
    const conflict = req.body.conflict

    db.query(
        "INSERT INTO rsvp (eventid, email, status, date, time, conflict) VALUES (?,?,?,?,?,?)",
        [eventid, email, status, date, time, conflict],
        (err, result) => {
            res.send(err)
        }
    );
});

app.get("/getrsvp/:email", (req, res) => {
    const email = req.params.email
    const sqlSelect = "SELECT rsvp.rsvpid, events.id, rsvp.email, events.title, events.description, events.location, events.time, events.date, rsvp.status, events.count, events.host, rsvp.conflict from rsvp INNER JOIN events ON rsvp.eventid=events.id WHERE email = ?";
    db.query(sqlSelect, [email], (err, result) => {
        res.send(result);
    });
});

app.delete("/deletersvp/:id", (req, res) => {
    const rsvpid = req.params.id
    db.query("DELETE FROM rsvp WHERE rsvpid = ?",
    [rsvpid],
    (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});

app.delete("/deletersvpevent/:id", (req, res) => {
    const eventid = req.params.id
    db.query("DELETE FROM rsvp WHERE eventid = ?",
    [eventid],
    (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});

app.post("/updatersvp", (req, res) => {
    const rsvpid = req.body.rsvpid
    const status = req.body.status
    db.query("UPDATE rsvp SET status = ? WHERE rsvpid = ?",
    [status, rsvpid],
    (err, result) => {
        if (err) {
            console.log(err)
        }
    });
});

app.post("/getattendee", (req, res) => {
    const eventid = req.body.event
    const status = req.body.status
    const sqlSelect = "SELECT * FROM rsvp WHERE eventid = ? AND status = ?";
    db.query(sqlSelect, [eventid, status], (err, result) => {
        res.send(result);
    });
});

app.post("/updatecount", (req, res) => {
    const id = req.body.id
    const count = req.body.count
    db.query("UPDATE events SET count = ? WHERE id = ?",
    [count, id],
    (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    });
});

app.post("/check", (req, res) => {
    const eventid = req.body.id
    const email = req.body.email
    const sqlSelect = "SELECT * FROM rsvp WHERE eventid = ? AND email = ?";
    db.query(sqlSelect, [eventid, email], (err, result) => {
        res.send(result);
    });
});

app.post("/invite", (req, res) => {

    const eventid = req.body.eventid
    const email = req.body.email

    db.query(
        "INSERT INTO invite (eventid, email) VALUES (?,?)",
        [eventid, email],
        (err, result) => {
            res.send(err)
        }
    );
});

app.post("/checkuser", (req, res) => {

    const email = req.body.email

    db.query(
        "SELECT * FROM login WHERE email = ?",
        [email],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }

            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong email or password!" });
            }
        }
    );
});

app.post("/checkinvite", (req, res) => {
    const eventid = req.body.id
    const email = req.body.email
    const sqlSelect = "SELECT * FROM invite WHERE eventid = ? AND email = ?";
    db.query(sqlSelect, [eventid, email], (err, result) => {
        res.send(result);
    });
});

app.post("/checklocation", (req, res) => {
    const location = req.body.location
    const sqlSelect = "SELECT * FROM events WHERE location = ?";
    db.query(sqlSelect, [location], (err, result) => {
        res.send(result);
    });
});

app.post("/checkhost", (req, res) => {
    const host = req.body.host
    const sqlSelect = "SELECT * FROM events WHERE host = ?";
    db.query(sqlSelect, [host], (err, result) => {
        res.send(result);
    });
});

app.post("/checkinvitetype", (req, res) => {
    const invite = req.body.invite
    const sqlSelect = "SELECT * FROM events WHERE invite = ?";
    db.query(sqlSelect, [invite], (err, result) => {
        res.send(result);
    });
});

app.post("/checkconflict", (req, res) => {
    const date = req.body.date
    const time = req.body.time
    const email = req.body.email
    const sqlSelect = "SELECT * FROM rsvp WHERE date = ? AND time = ? AND email = ?";
    db.query(sqlSelect, [date, time, email], (err, result) => {
        res.send(result);
    });
});

app.post("/updateconflict", (req, res) => {
    const conflict = req.body.conflict
    const date = req.body.date
    const time = req.body.time
    const email = req.body.email
    db.query("SET SQL_SAFE_UPDATES = 0");
    db.query("UPDATE rsvp SET conflict = ? WHERE date = ? AND time = ? AND email = ?",
    [conflict, date, time, email],
    (err, result) => {
        if (err) {
            console.log(err)
        }
    });
    db.query("SET SQL_SAFE_UPDATES = 1");
});

//attemps to connect to the server
app.listen(3001, () => {
    console.log("server running");
})