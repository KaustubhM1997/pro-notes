
import "./nomatch.css";

const NoMatch = () => {

    return (
        <>
          <p className="error-header">404 Not Found</p>
          <p className="error-text">
            Woops! Looks like this page does not exist on the server.
          </p>
        </>
      );


}


export {NoMatch}