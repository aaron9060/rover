int motorEnableL = 3;
int motorEnableR = 6;
int motorL = 5;
int motorR = 4;

void setup(){
	Serial.begin(9600);
	pinMode(motorL, OUTPUT);
	pinMode(motorR, OUTPUT);
	pinMode(motorEnableR, OUTPUT);
	pinMode(motorEnableL, OUTPUT);
	power_down();
	delay(500);
}

void loop(){
	int i=0;
	char request[100];
	if(Serial.available()){
		 delay(100);
		 while( Serial.available() && i < 99) { request[i++] = Serial.read(); }
		 request[i++]='\0'; 
	}
	if( i > 0 ){ProcessRequest(request);}
}

void ProcessRequest(char* requeststring){
	char *str;
	char *command_arg[5];
	int count = 0;
  // Gather command and arguments from requeststring
	while ((str = strtok_r(requeststring, " ", &requeststring)) != NULL){
		command_arg[count] = str;
		count++;
	} 
	consoleError("COMMAND DEBUG", command_arg, count);
	if(strcmp(command_arg[0],"MOVE" == 0)){
		if(strcmp(command_arg[1],"STOP") == 0){	power_down();	}
		else {
			if(strcmp(command_arg[2],"SPEED" == 0)){

				int speed = atoi(command_arg[3]);
				if(speed >= 0 && speed <=255){ 
					// Find direction argument
					cmd_move(command_arg[1], speed);
				} 
				// speed value outside of range (speed >= 0 && speed <=255)    
				else {
					consoleError("speed value outside of range (speed >= 0 && speed <=255)", command_arg, count);
				}
			}
			else {
			// speed command not found strcmp((command_arg[2],"SPEED" == 0))
				consoleError("speed command not found strcmp((command_arg[2],\"SPEED\" == 0))", command_arg, count);
			}
		}
	}
	else {
		// Check for OTHER commands 
		consoleError("invalid command", command_arg, count);
	}
}

void consoleError(char *errorMessage, char *commandString[], int index){
int i = 0;
	Serial.println("***********************");
	Serial.println(errorMessage);
	for(i=0;i<index;i++){
		Serial.print("Command ");
		Serial.print(i);
		Serial.print(": ");
		Serial.println(commandString[i]);
	}
	Serial.println("***********************");
}

void cmd_move(char *direction, int speed) {
	Serial.print("Moving ");
	Serial.println(direction);

	if (strcmp(direction, "FORW") == 0) {
		analogWrite(motorEnableR, speed);
		analogWrite(motorEnableL, speed);
		digitalWrite(motorL, LOW);
		digitalWrite(motorR, LOW);  
	}
	else if (strcmp(direction, "BACK") == 0) {
		analogWrite(motorEnableR, speed);
		analogWrite(motorEnableL, speed);
		digitalWrite(motorL, HIGH);
		digitalWrite(motorR, HIGH);  
	}
	else if (strcmp(direction, "FWRI") == 0) {
		analogWrite(motorEnableR, speed/2);
		analogWrite(motorEnableL, speed);
		digitalWrite(motorL, LOW);
		digitalWrite(motorR, LOW);  
	}
	else if (strcmp(direction, "FWLE") == 0) {
		analogWrite(motorEnableR, speed);
		analogWrite(motorEnableL, speed/2);
		digitalWrite(motorL, LOW);
		digitalWrite(motorR, LOW);
	}
	else if (strcmp(direction, "BWRI") == 0) {
		analogWrite(motorEnableR, speed/2);
		analogWrite(motorEnableL, speed);
		digitalWrite(motorL, HIGH);
		digitalWrite(motorR, HIGH);  
	}
	else if (strcmp(direction, "BWLE") == 0) {
	 	analogWrite(motorEnableR, speed);
		analogWrite(motorEnableL, speed/2);
		digitalWrite(motorL, HIGH);
		digitalWrite(motorR, HIGH);  
	}
}

void power_down() {
	// disable both motors
	Serial.println("POWERING DOWN");
	analogWrite(motorEnableR, 0);
	analogWrite(motorEnableL, 0);
	digitalWrite(motorL, LOW);
	digitalWrite(motorR, LOW);
	delay(200);
}
		
