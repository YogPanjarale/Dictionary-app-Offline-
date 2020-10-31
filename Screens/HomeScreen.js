import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import Tts from 'react-native-tts';
import db from '../database'

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchingPressed: false,
      result: {},


    };
  }
  componentDidMount(){
    this.setState({
      isSearchingPressed: true
     });
    
  }
  search() {
    this.setState({
     isSearchingPressed: true
    });
     this.getWord(this.state.text)

  }
   getWord(word) {
    var searchKeyWord = word.toLowerCase();
    
          var responseObject = db[word];
  
          if (responseObject) {
            console.log(responseObject)

         
            var definition = responseObject.definition
            var lexicalCategory = responseObject.lexicalCategory
  
            this.setState({
              "word": word,
              "definition": definition,
              "lexicalCategory": lexicalCategory,
            })
          }
          else {
            this.setState({
              "word": word,
              "definition": "Not Found"
            })
          }
        
      
  }
  render() {
    return (
      <View style={styles.container}>
        <Header centerComponent={{ text: 'Pocket Dictionary-Offline' }} />
        <TextInput
          onChangeText={(_text) => this.setState({ text: _text })}
          style={styles.input}
          placeholder={""}
          placeholderTextColor={"#0f0f0f"}
        />
        <TouchableOpacity style={styles.search} onPress={() => { this.search(this.state.search) }}>
<Text>{"Search"}</Text>
        </TouchableOpacity>
        {this.state.isSearchingPressed ? (<View>
          <View style={styles.textContainer}>
              <Text style={styles.detailsTitle}>{"Word : "}</Text>
              <Text style={styles.detailsText}>{this.state.word}</Text>
          </View>
          <View style={styles.textContainer}>
              <Text style={styles.detailsTitle}>{"Type: "}</Text>
              <Text style={styles.detailsText}>{this.state.lexicalCategory}</Text>
         </View > 
         <View style={styles.textContainer}>
          <Text style={styles.detailsTitle}>{"Definition : "}</Text>
          <Text style={styles.detailsText}>{this.state.definition}</Text>
        </View>
        <View style={[styles.textContainer,{marginHorizontal:125}]}>

        <TouchableOpacity onPress={()=>{
      
      
          }} style={styles.audioButton}>
          <Text >
            {this.state.word}
          </Text>
          <Text style={{fontSize:20}}>🔊 </Text>

        </TouchableOpacity>
        </View>
        </View>) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: '#feefef',
    flex:1,
  },
  input: {
    marginTop: 100, height: 40, borderColor: 'gray', borderWidth: 2,
    marginHorizontal: 50,
    textAlign: 'center',
    borderRadius:10
  },
  header: {
    color: 'white',
    backgroundColor: '#f124d3'
  }
  , search: {
    marginTop: 10, height: 25, backgroundColor: 'cyan', width: 75,
    marginHorizontal: 50,
    textAlign: "center"
  },
  detailsTitle: {
    color: "#cfc44f",
    fontSize:15,
    fontWeight:"bold",
  
  },
  detailsText: {

  },

  textContainer: {
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
    margin:10
  },
  audioButton:{
    width:100, 
   
    backgroundColor: '#ffaf0f',
    borderRadius:10,
    borderWidth:3,
    
    textAlign: 'center',
  },
  audioContainer: {
    marginHorizontal: 120,
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  }
});
