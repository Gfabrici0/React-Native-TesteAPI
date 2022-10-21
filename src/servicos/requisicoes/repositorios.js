import { TouchableOpacity, FlatList, Text } from "react-native";
import estilos from "../../paginas/Repositorios/estilos";
import api from "../api";

export async function pegarRepositoriosDoUsuario(id){
    try {
        const resultado = await api.get(`/repos?postId=${id}`);
        return resultado.data;
      }
      catch (error){
        console.log(error);
        return [];
      }
}

export async function salvarRepositoriosDoUsuario(postId, nome, data, id){
  try {
    const resultado = await api.put(`/repos/${id}`, {
      name: nome,
      data: data,
      postId: postId,
      id: id
    });
    return 'sucesso';
    }
    catch (error){
      console.log(error);
      return 'erro';
    }
}

export function BuscaRepositorio({nomeRepositorio, repo, navigation}){
  const lista = []

  for (const value of repo) {
    if(value.name.includes(nomeRepositorio)){
      lista.push(value)
    }
  }
  if(lista.length === 0){
    return <Text>
      Nenhum repositorio encontrado
    </Text>
  }
  else {
    return(
      <FlatList 
        data={lista}
        keyExtractor={lista => lista.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={estilos.repositorio}
            onPress={() => navigation.navigate('InfoRepositorio', {item})}
          >
            <Text style={estilos.repositorioNome}>{ item.name }</Text>
            <Text style={estilos.repositorioData}>{ item.data }</Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

export async function criarRepositoriosDoUsuario(postId, nome, data){
  try {
    await api.post(`/repos`, {
      name: nome,
      data: data,
      postId: postId
    });
    return 'sucesso';
    }
    catch (error){
      console.log(error);
      return 'erro';
    }
}

export async function deletarRepositoriosDoUsuario(id){
  try {
    await api.delete(`/repos/${id}`);
    return 'sucesso';
    }
    catch (error){
      console.log(error);
      return 'erro';
    }
}