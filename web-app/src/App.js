import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Screen from './components/Screen';
import Footer from './components/Footer';
import ClassHeader from './components/ClassHeader';
import ClassScreen from './components/ClassScreeen';
import ClassFooter from './components/ClassFooter';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-headerr">
          <table border={2}>
            <thead>
              <tr>
                <th>Store from Local Data JSON</th>
                <th>Classroom from github data JSON</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Header /></td>
                <td><ClassHeader /></td>
              </tr>
              <tr>
                <td><Screen /></td>
                <td><ClassScreen /></td>
              </tr>
              <tr>
                <td><Footer /></td>
                <td><ClassFooter /></td>
              </tr>
            </tbody>
          </table>
        </header>
      </div>
    </>
  )
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
