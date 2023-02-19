import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Activity } from 'App/models/interfaces/activity';
import { ChatComment } from 'App/models/interfaces/comment';
import { store } from 'App/stores/store';
import { parse, parseISO, parseJSON } from 'date-fns';
import { makeAutoObservable, runInAction } from 'mobx';

class CommentStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  createAndStartHubConnection = (activityId: string) => {
    if (store.activityStore.selectedActivity) {
      this.hubConnection = this.createHubConnection(activityId);

      this.hubConnection
        .start()
        .catch((error) =>
          console.error('Error starting SignalR Connection to Server', error)
        );

      this.configureHubConnection(this.hubConnection);
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.error('Error stopping connection', error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComment = async (values: any) => {
    values.activityId = store.activityStore.selectedActivity?.id;
    try {
      await this.hubConnection?.invoke<ChatComment>('SendComment', values);
    } catch (error) {
      console.error(error);
    }
  };

  private configureHubConnection(hubConnection: HubConnection) {
    hubConnection.on('LoadComments', (comments: ChatComment[]) => {
      runInAction(() => {
        comments.forEach((comment) => {
          comment.createdAt = new Date(comment.createdAt + 'Z');
        });

        this.comments = comments;
      });
    });

    hubConnection.on('ReceiveComment', (comment: ChatComment) => {
      runInAction(() => {
        comment.createdAt = new Date(comment.createdAt);
        this.comments.unshift(comment);
      });
    });
  }

  private createHubConnection(activityId: string) {
    console.log(activityId);
    return new HubConnectionBuilder()
      .withUrl(`http://localhost:5272/chat?activityId=${activityId}`, {
        accessTokenFactory: () => store.userStore.user?.token!,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
  }
}

export default CommentStore;
