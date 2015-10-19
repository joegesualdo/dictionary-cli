#!/usr/bin/env node

var chalk = require('chalk');
var VocabFetcher = require("vocab-fetcher")
var vocabFetcher = new VocabFetcher()
var ManipulateSubstring = require("manipulate-substring")

var args = process.argv.slice(2);

if(args.indexOf("-h") > -1){
  console.log("Usage:\n  definition <word> [options]")
  console.log("Options:")
  console.log("  -h  # Show all options")
  console.log("  -s  # Show sentences")
  console.log("  -f  # Show related words")
  console.log("  -sd  # Show short description")
  console.log("  -ld  # Show long description")
  console.log("Example:\n  definition abate -a")

  return
}

if(!args[0]){
  throw new Error("Must provide a word as the first agument")
}

var showSentences;
var showFamily;
var showShortDescription;
var showLongDescription;
var showDefinitions;

// Defaults
if(args.length == 1){
  showSentences = false 
  showFamily = false 
  showShortDescription = true 
  showLongDescription = false 
  showDefinitions = true
}

if(args.indexOf("-s") > -1){
  showSentences = true
}
if(args.indexOf("-f") > -1){
  showFamily= true
}
if(args.indexOf("-sd") > -1){
  showShortDescription = true
}
if(args.indexOf("-ld") > -1){
  showLongDescription = true
}
if(args.indexOf("-a") > -1){
  showSentences = true
  showFamily= true
  showShortDescription = true
  showLongDescription = true
}

vocabFetcher.getWord(args[0]).then(function(word){
  console.log("")
  console.log("WORD: " + chalk.green(args[0].toUpperCase()))
  console.log("")
  if(showShortDescription == true){
    printShortDescription(word)
    console.log("")
  }
  if(showLongDescription == true){
    printLongDescription(word)
    console.log("")
  }
  if(showDefinitions == true){
    printDefinitions(word)
    console.log("")
  }
  if(showSentences == true){
    printSentences(word)
    console.log("")
  }
  if(showFamily== true){
    printFamily(word)
    console.log("")
  }
})


function printShortDescription(wordObj){
  console.log(chalk.underline.blue("Short Description"))
  console.log(chalk.green(wordObj.name.capitalizeFirstLetter()) + ": " +wordObj.shortDescription)
}
function printLongDescription(wordObj){
  console.log(chalk.underline.blue("Long Description"))
  console.log(chalk.green(wordObj.name.capitalizeFirstLetter()) + ": " + wordObj.longDescription)
}
function printDefinitions(wordObj){
  console.log(chalk.underline.blue("Definitions"))
  for(var i = 0; i < wordObj.definitions.length; i++){
    defObj = wordObj.definitions[i]
    console.log(chalk.yellow(defObj.partOfSpeech) + ") " + defObj.definition)
  }
}

function printSentences(wordObj){
  console.log(chalk.underline.blue("Sentences"))
  for(var i = 0; i < wordObj.sentences.length; i++){
    sentenceObj = wordObj.sentences[i]
    console.log(chalk.yellow(i+1) +") " + ManipulateSubstring.colorizeBetweenCharacterIndexes("green", sentenceObj.offsets[0], sentenceObj.offsets[1], sentenceObj.sentence))
    // console.log(chalk.yellow(i+1) +") " + sentenceObj.offsets)
  }
}
function printFamily(wordObj){
  console.log(chalk.underline.blue("Family"))
  for(var i = 0; i < wordObj.family.length; i++){
    familyObj = wordObj.family[i]
    console.log(chalk.yellow(i+1) +") " + familyObj.word)
  }
}

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

