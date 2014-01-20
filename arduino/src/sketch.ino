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
  char *p = requeststring;
  char *str;
  char *inParse[5];
  int count = 0;
  int i = 0;
  
  while ((str = strtok_r(requeststring, " ", &requeststring)) != NULL){
    inParse[count] = str;
    count++;
  }    
  char *command_arg1 = inParse[0]; 
  char *command_arg2 = inParse[1]; 
  char *command_arg3 = inParse[2]; 
  char *command_arg4 = inParse[3]; 
  if(!strcmp(command_arg1,"MOVE")){
    if(!strcmp(command_arg2,"STOP")){ power_down(); }
    else {
      if(!strcmp(command_arg3,"SPEED")){
        int speed = atoi(command_arg4);
        if(speed >= 0 && speed <=255){ 
          if(!strcmp(command_arg2,"FORW")){
            Serial.print("Moving forward at speed ");
            Serial.println(speed);
            forward(speed);
          }
          else if(!strcmp(command_arg2,"BACK")){
            Serial.print("Moving backward at speed ");
            Serial.println(speed);
            backward(speed);
          }
          else if(!strcmp(command_arg2,"FWLE")){
            Serial.print("Moving forward/left at speed ");
            Serial.println(speed);
            turnleft(speed);
          }
          else if(!strcmp(command_arg2,"FWRI")){
            Serial.print("Moving forward/right at speed ");
            Serial.println(speed);
            turnright(speed);
          }
          else if(!strcmp(command_arg2,"BWLE")){
            Serial.print("Moving backward/left at speed ");
            Serial.println(speed);
            backleft(speed);
          } 
          else if(!strcmp(command_arg2,"BWRI")){
            Serial.print("Moving backward/right at speed ");
            Serial.println(speed);
            backright(speed);
          } 
          else {
            Serial.println("== Syntax Error ==");
            for(i=0;i<=count;i++){
              Serial.print("Command ");
              Serial.print(i);
              Serial.print(": ");
              Serial.println(inParse[i]);
            }
          }
        }        
        else {
          Serial.println("== Syntax Error ==");
          Serial.print("Invalid integer value for speed: ");
          Serial.println(speed);
        } 
      }
      else {
        Serial.println("==Syntax Error ==");
        Serial.print("Invalid speed: ");
        Serial.println(command_arg3);
      }
    }
  }
  else {
    Serial.println("==Syntax Error ==");
    Serial.print("Invalid command: ");
    Serial.println(command_arg1);
  }
}


void forward(byte speed) {
  Serial.println("forward");
  analogWrite(motorEnableR, speed);
  analogWrite(motorEnableL, speed);
  digitalWrite(motorL, LOW);
  digitalWrite(motorR, LOW);  
}
 
void backward(byte speed) {
  Serial.println("reverse");
  analogWrite(motorEnableR, speed);
  analogWrite(motorEnableL, speed);
  digitalWrite(motorL, HIGH);
  digitalWrite(motorR, HIGH);  
}

void turnright(byte speed) {
  Serial.println("Turning Right");
  analogWrite(motorEnableR, speed/2);
  analogWrite(motorEnableL, speed);
  digitalWrite(motorL, LOW);
  digitalWrite(motorR, LOW);  
}

void turnleft(byte speed) {
  Serial.println("Turning Left");
  analogWrite(motorEnableR, speed);
  analogWrite(motorEnableL, speed/2);
  digitalWrite(motorL, LOW);
  digitalWrite(motorR, LOW);
}
void backright(byte speed) {
  Serial.println("Backwards Right");
  analogWrite(motorEnableR, speed/2);
  analogWrite(motorEnableL, speed);
  digitalWrite(motorL, HIGH);
  digitalWrite(motorR, HIGH);  
}
void backleft(byte speed) {
  Serial.println("Backwards Left");
  analogWrite(motorEnableR, speed);
  analogWrite(motorEnableL, speed/2);
  digitalWrite(motorL, HIGH);
  digitalWrite(motorR, HIGH);  
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
    
