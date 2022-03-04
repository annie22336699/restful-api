import './App.css';
import { useEffect, useState } from 'react';
import config from './Config';

function App() {
  const [data, setData] = useState({});



  useEffect(() => {
    // 改async await
    (async () => {
      const r1 = await fetch(config.AB_LIST);
      const obj = await r1.json();
      console.log(obj);
      setData(obj);
    })();
  }, []);
  //  ↑上面這個[]不加會沒有default的作用，所以會瘋狂重新渲染

  console.log(data);

  const renderMe = (data) => {
    if (data.rows && data.rows.length) {
      return data.rows.map((el) => (
        <tr key={'test' + el.sid}>
          <td>{el.sid}</td>
          <td>{el.name}</td>
          <td>{el.email}</td>
          <td>{el.mobile}</td>
          <td>{el.birthday}</td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td></td>
        </tr>
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        {data.rows && data.rows.length ? (
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#/">
                  Previous
                </a>
              </li>
              {Array(data.totalPages)
                .fill(1)
                .map((el, i) => (
                  <li className="page-item">
                    <a className="page-link" href="#/" onClick={()=>{}}>
                      {i + 1}
                    </a>
                  </li>
                ))}
              <li className="page-item">
                <a className="page-link" href="#/">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        ) : (
          ''
        )}
      </div>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">mobile</th>
              <th scope="col">birthday</th>
            </tr>
          </thead>
          <tbody>{renderMe(data)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
