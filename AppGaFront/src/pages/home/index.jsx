import { useState, useRef } from "react";
import { useEffect } from "react";
import "./style.css";
import api from "../../services/api";
import Trash from "../../assets/lixeira.png";
import Edit from "../../assets/edit.png";

function Home() {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(null); // Novo estado para controlar a edição
  const [editedUser, setEditedUser] = useState(null); // Novo estado para armazenar os dados do usuário em edição

  const nomePeca = useRef();
  const quantidadePeca = useRef();
  const preco = useRef();
  const totalVenda = useRef();
  const investido = useRef();
  const ganho = useRef();
  const valorCostura = useRef();
  const totalCostura = useRef();
  const valorTecido = useRef();
  const valorBojo = useRef();
  const modelo = useRef();

  useEffect(() => {
    async function fetchData() {
      await getUsers();
    }
    fetchData();
  }, []);

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    try {
      if (!nomePeca.current || !quantidadePeca.current || !preco.current) {
        throw new Error("Preencha todos os campos obrigatórios.");
      }

      const newUser = {
        nomePeca: nomePeca.current.value,
        quantidadePeca: parseFloat(quantidadePeca.current.value) || 0,
        preco: parseFloat(preco.current.value) || 0,
        valorCostura: parseFloat(valorCostura.current.value) || 0,
        valorTecido: parseFloat(valorTecido.current.value) || 0,
        valorBojo: parseFloat(valorBojo.current.value) || 0,
      };

      await api.post("/usuarios", newUser);
      getUsers();
    } catch (error) {
      console.error("Erro ao criar usuário:", error.message);
    }
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  async function updateUsers(id) {
    try {
      const updatedUser = {
        nomePeca: nomePeca.current.value,
        quantidadePeca: parseFloat(quantidadePeca.current.value) || 0,
        preco: parseFloat(preco.current.value) || 0,
        valorCostura: parseFloat(valorCostura.current.value) || 0,
        valorTecido: parseFloat(valorTecido.current.value) || 0,
        valorBojo: parseFloat(valorBojo.current.value) || 0,
      };

      const response = await api.put(`/usuarios/${id}`, updatedUser);
      console.log("Usuário atualizado:", response.data);
      getUsers(); // Atualiza a lista de usuários
    } catch (error) {
      console.error(
        "Erro ao atualizar usuário:",
        error.response || error.message
      );
      alert("Erro na requisição. Detalhes: " + error.message);
    }
  }

  // Função para lidar com as mudanças nos campos de edição
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <aside>
        <button>Dashboard</button>
        <button>Cadastro</button>
      </aside>
      <div className="flexColum">
        <h1>Cadastre o Produto</h1>
        <form>
          <div className="rows">
            <label htmlFor="modelo">Nome do Modelo</label>
            <input ref={nomePeca} placeholder="Nome da Peça" name="modelo" />
          </div>

          <div className="rows">
            <label htmlFor="pecas">Quantidade</label>
            <input
              ref={quantidadePeca}
              type="number"
              placeholder="Quantidade de Peças"
              name="pecas"
              onChange={handleEditChange}
            />
          </div>

          <div className="rows">
            <label htmlFor="preco">Preço de venda</label>
            <input
              ref={preco}
              type="number"
              placeholder="Preço"
              name="preco"
              onChange={handleEditChange}
            />
          </div>
          <div className="rows">
            <label htmlFor="costura">Valor da Costura</label>
            <input
              ref={valorCostura}
              type="number"
              placeholder="Valor da Costura"
              name="costura"
              onChange={handleEditChange}
            />
          </div>

          <div className="rows">
            <label htmlFor="bojo">Valor do Tecido</label>
            <input
              ref={valorTecido}
              type="number"
              placeholder="Valor do Tecido"
              name="bojo"
            />
          </div>
          <div className="rows">
            <label htmlFor="bojo">Valor do Bojo</label>
            <input ref={valorBojo} type="number" placeholder="Valor do Bojo" />
          </div>
        </form>

        <button type="button" className="btn" onClick={createUsers}>
          Cadastrar
        </button>

        <div className="overflow">
          {users.map((user) => (
            <div className="info-geral1" key={user.id}>
              <div className="row">
                <h5>Nome do Modelo </h5>
                {editMode === user.id ? (
                  <input
                    name="nomePeca"
                    value={editedUser?.nomePeca || user.nomePeca}
                    onChange={handleEditChange}
                  />
                ) : (
                  <p>{user.nomePeca}</p>
                )}
              </div>

              <div className="row">
                <h5>Qtd de Peças </h5>
                {editMode === user.id ? (
                  <input
                    name="quantidadePeca"
                    type="number"
                    value={editedUser?.quantidadePeca || user.quantidadePeca}
                    onChange={handleEditChange}
                  />
                ) : (
                  <p>{user.quantidadePeca}</p>
                )}
              </div>

              <div className="row">
                <h5>Preço de Vendas </h5>
                {editMode === user.id ? (
                  <input
                    name="preco"
                    type="number"
                    value={editedUser?.preco || user.preco}
                    onChange={handleEditChange}
                  />
                ) : (
                  <p>R$ {user.preco.toFixed(2)}</p>
                )}
              </div>

              <div className="row">
                <h5>Valor Total Vendas </h5>
                <p className="nomePro">R$ {user.totalVenda.toFixed(2)} </p>
              </div>

              <div className="row">
                <h5>Total Costura </h5>
                <p className="costura">R$ {user.totalCostura.toFixed(2)}</p>
              </div>

              <div className="row">
                <h5> Investido </h5>
                <p>R$ {user.investido.toFixed(2)}</p>
              </div>

              <div className="row">
                <h5> Ganho</h5>
                <p className="nomePro">R$ {user.ganho.toFixed(2)}</p>
              </div>

              {editMode === user.id ? (
                <button
                  className="btn-lixeira"
                  onClick={() => {
                    updateUsers(user.id);
                    setEditMode(null); // Sai do modo de edição
                  }}
                >
                  Salvar
                </button>
              ) : (
                <button
                  className="btn-lixeira"
                  onClick={() => {
                    setEditMode(user.id);
                    setEditedUser({
                      nomePeca: user.nomePeca,
                      quantidadePeca: user.quantidadePeca,
                      preco: user.preco,
                      valorCostura: user.valorCostura,
                      valorTecido: user.valorTecido,
                      valorBojo: user.valorBojo,
                    }); // Preenche o estado com os dados do usuário
                  }}
                >
                  <img src={Edit} alt="editar" />
                </button>
              )}

              <button
                className="btn-lixeira"
                onClick={() => deleteUsers(user.id)}
              >
                <img src={Trash} alt="lixeira" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
