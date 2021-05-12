import logo from './logo.svg';
import './App.css';

function AppT() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
          <button className="addButton" onClick="return AppT()">
            <img src={logo} className="addButtonPicture"/>
          </button>
      </header>
    </div>
  );
}

// style="width: auto; height: auto; display: block;"

function App() {
  return (
    <div class="box-container box-container-overflow box-container-fancy box-container-fancy-fixed">
      <div class="box-wrapper">
        <div class="box-skin">
          <h1 class="login-main-text">
            Connect to your account
          </h1>
          <div class="box-wrapper2">
            <div class="login-extern-connection">
              <h3>
                Already an account DasHub
              </h3>
            </div>
            <div class="login-intern-connection">
              <h3>
                Connect with
              </h3>
              <form>
                <input class="login-textfield-connection" type="email" name="email" value="Email" required=""></input>
                <input class="login-textfield-connection" type="password" name="password" value="*********" required=""></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
