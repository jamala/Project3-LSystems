// A class that represents a symbol replacement rule to
// be used when expanding an L-system grammar.
function Rule(prob, str) {
	this.probability = prob; // The probability that this Rule will be used when replacing a character in the grammar string
	this.successorString = str; // The string that will replace the char that maps to this Rule
}

// TODO: Implement a linked list class and its requisite functions
// as described in the homework writeup
var Node = function(character) {
	return {
		next: null,
		previous: null,
		character: character,
	}
}

export class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	//adds a node to the end of the list
	append(node) {
		if (this.head === null) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			node.previous = this.tail;
			this.tail = node;
		}
	}
}

export function stringToLinkedList(input_string) {
	// ex. assuming input_string = "F+X"
	// you should return a linked list where the head is 
	// at Node('F') and the tail is at Node('X')
	var ll = new LinkedList();

	for (let char of input_string) {
		ll.append(Node(char));
	}
	return ll;
}

export function linkedListToString(linkedList) {
	// ex. Node1("F")->Node2("X") should be "FX"
	var result = "";
	let current = linkedList.head;
	while (current !== null) {
		result += current.character;
		current = current.next;
	}
	return result;
}

// TODO: Given the node to be replaced, 
// insert a sub-linked-list that represents replacementString
// assumption: node is in list, list is not empty, sub-list is not empty
function replaceNode(linkedList, node, replacementString) {
	let replacementList = stringToLinkedList(replacementString);


	//case when node is the only item in the list
	if (node.previous === null && node.next === null) {
		linkedList.head = replacementList.head;
		linkedList.tail = replacementList.tail;
	} else if (node.previous === null) {
		// at beginning
		linkedList.head = replacementList.head;
		replacementList.tail.next = node.next;
		node.next.previous = replacementList.tail;
	} else if (node.next === null) {
		// at end
		linkedList.tail = replacementList.tail;
		replacementList.head.previous = node.previous;
		node.previous.next = replacementList.head;
	} else {
		//in the middle somewhere
		replacementList.tail.next = node.next;
		replacementList.head.previous = node.previous;
		node.next.previous = replacementList.tail;
		node.previous.next = replacementList.head;
	}


}

export default function Lsystem(axiom, grammar, iterations) {
	// default LSystem
	this.axiom = "FX";
	this.grammar = {};
	this.grammar['X'] = [
		new Rule(1.0, '[-FX][+FX]')
	];
	this.iterations = 0; 
	
	// Set up the axiom string
	if (typeof axiom !== "undefined") {
		this.axiom = axiom;
	}

	// Set up the grammar as a dictionary that 
	// maps a single character (symbol) to a Rule.
	if (typeof grammar !== "undefined") {
		this.grammar = Object.assign({}, grammar);
	}
	
	// Set up iterations (the number of times you 
	// should expand the axiom in DoIterations)
	if (typeof iterations !== "undefined") {
		this.iterations = iterations;
	}

	// A function to alter the axiom string stored 
	// in the L-system
	this.updateAxiom = function(axiom) {
		// Setup axiom
		if (typeof axiom !== "undefined") {
			this.axiom = axiom;
		}
	}

	// TODO
	// This function returns a linked list that is the result 
	// of expanding the L-system's axiom n times.
	// The implementation we have provided you just returns a linked
	// list of the axiom.
	this.doIterations = function(n) {	
		var lSystemLL = stringToLinkedList(this.axiom);
		console.log(lSystemLL);
		return lSystemLL;
	}
}