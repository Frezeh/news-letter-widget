import { useState } from "react";
import { ThumbUp, ErrorIcon, EmailOutlined } from '@material-ui/icons';
import { IconButton } from "@material-ui/core";

export default function Home() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async (e) => {
    e.preventDefault();
    setState("LOADING");
    setErrorMessage(null);
    try {
      const res = await fetch('/api/newsletter', {
        body: JSON.stringify({ firstname, lastname, email }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const result = await res.json();
      console.log(result);
      setState("SUCCESS");
    } catch (e) {
      setErrorMessage(e.result.error);
      setState("ERROR");
    }
  };

  return (
    <div className="container">
      <section className="row mt-5 text-center">
        <div className="col-md-6 m-auto">
          <IconButton color="primary">
            <EmailOutlined />
          </IconButton>
          <h1 className="display-4">Newsletter Signup</h1>
          <p className="lead">
            Enter your info to get our awesome monthly newsletter
          </p>
          <form onSubmit={subscribe}>
            <div className="form-group">
              <input type="text" name="firstName" id="first-name" className="form-control" placeholder="First Name"
                required onChange={(e) => setFirstname(e.target.value)} />
            </div>
            <div className="form-group">
              <input type="text" name="lastName" id="last-name" className="form-control" placeholder="Last Name" required
                onChange={(e) => setLastname(e.target.value)} />
            </div>
            <div className="form-group">
              <input type="email" name="email" id="email" className="form-control" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Sign Up
            </button>
          </form>
        </div>
      </section>
      {state === "ERROR" && (
        <section className="row mt-5 text-center">
          <div className="col-md-6 m-auto">
            <IconButton color="primary">
              <ErrorIcon />
            </IconButton>
            <h1 className="display-4">Sorry!</h1>
            <p className="lead">
              {errorMessage}
            </p>
            <button className="btn btn-secondary" onClick={() => window.location.reload(false)}>Back</button>
          </div>
        </section>
      )}
      {state === "SUCCESS" && (
        <section className="row mt-5 text-center">
          <div className="col-md-6 m-auto">
            <IconButton color="primary">
              <ThumbUp />
            </IconButton>
            <h1 className="display-4">Success!</h1>
            <p className="lead">
              You are now signed up for our awesome montly newsletter!
            </p>
            <button className="btn btn-secondary" onClick={() => window.location.reload(false)}>Back</button>
          </div>
        </section>
      )}
    </div>
  );
};