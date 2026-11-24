pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t webapp-project:${BUILD_NUMBER} .'
            }
        }

        stage('Docker Deployment') {
            steps {
                sh '''
                    docker rm -f webapp-jenkins || true
                    docker run -d \
                        --name webapp-jenkins \
                        -p 3001:3000 \
                        webapp-project:${BUILD_NUMBER}
                '''
            }
        }
    }
}
