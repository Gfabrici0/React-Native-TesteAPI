import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { BuscaRepositorio, pegarRepositoriosDoUsuario } from '../../servicos/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const estaNaTela = useIsFocused();

    const [nomeRepositorio, setNomeRepositorio] = useState('');

    async function buscaRepositorioPorNome(){
        const resultado = await buscaRepositorioPorNome(route.params.id, nomeRepositorio);
        setNomeRepositorio('');
        if(resultado){
            setRepo(resultado);
        }
        else{
            Alert.alert("Repositório não encontrado");
            setRepo({});
        }
    }

    useEffect( async () => {
        const resultado = await pegarRepositoriosDoUsuario(route.params.id);
        setRepo(resultado);
    }, [estaNaTela])

    return (
        <View style={estilos.container}>        
            <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
            {
                repo?.length > 0 &&
                <>
                <TextInput 
                placeholder="Busque por um nome de repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nomeRepositorio}
                onChangeText={setNomeRepositorio}
                />
                </>
            }

            <TouchableOpacity 
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio', {id: route.params.id})}
            >
                <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
            </TouchableOpacity>

            {
                nomeRepositorio.length === 0 &&
            <FlatList 
                data={repo}
                style={{ width: '100%' }}
                keyExtractor={repo => repo.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={estilos.repositorio}
                        onPress={() => navigation.navigate('InfoRepositorio', {item})}
                    >
                        <Text style={estilos.repositorioNome}>{ item.name }</Text>
                        <Text style={estilos.repositorioData}>Atualizado em {item.data}</Text>
                    </TouchableOpacity>
                )}
            />
            }
            {
                nomeRepositorio.length > 0 &&
                <BuscaRepositorio 
                nomeRepositorio={nomeRepositorio}
                repo={repo}
                navigation={navigation}
                />
            }
        </View>
    );
}
