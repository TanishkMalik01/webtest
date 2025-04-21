#include<stdio.h>
#include<stdlib.h>
#include<conio.h>
struct node*new();
void traverse();

struct node
{
    int data;
    struct node *next;
};
struct node *head,*temp,*p;

void main(){
    int i;
    for(i=1;i<=5;i++){
        new();
        traverse();
    }
    getch();
}
struct node* new() {
    int a;
    p = (struct node*)malloc(sizeof(struct node));
    printf("Enter the data: ");
    scanf("%d",&a);
    p->data = a;
    p->next = NULL;
    if (head == NULL) {
        head = p;
    } else {
        temp = head;
        while (temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = p;
    }
}

void traverse(){
    temp = head;
    while(temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
}

