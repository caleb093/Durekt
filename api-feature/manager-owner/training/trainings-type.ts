export interface trainingModuleType {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    status: boolean;
    TrainingTopic: trainingTopicType[]
}

export interface trainingTopicType {
    id: number;
    title: string;
    description: string;
    status: boolean;
    TrainingTopicUpload: {url: string; type: string; status: boolean}[]
}

export interface userTopicProgress {
    topicTitle: string;
    progress: string;
    assignedAt: Date
}

export interface trainingEnrolledType {
    topicId: number;
    topicTitle: string;
    progress: string;
    module: string;
    thumbnail: string    
}