import FirebaseContext, { withFirebase } from "./context";
import Firebase from "./firebase";

const firebase = new Firebase();
export default firebase;

export { FirebaseContext, withFirebase };
