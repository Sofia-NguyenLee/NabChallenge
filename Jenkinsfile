pipeline {
    agent any
    stages {
        stage ('Verify build') {
            steps {
                script {                    
                    echo "Checkou current working branch: $GIT_BRANCH"
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Sofia-NguyenLee/NabChallenge.git']]])                    
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    bat 'npm install'
                    bat 'npm install -D cypress'

                    bat 'npm run "cy:verify"'
                    bat 'npm run "cy:info"'
                    bat 'npm run "cy:version"'
                }
            }
        }

        stage('Run test') {
            steps {
                script {
                    echo "Running tests on Chrome"
                    bat 'npm run "e2e:chrome"'

                    echo "Running tests on Firefox"
                    bat 'npm run "e2e:firefox"'

                    echo "Running tests parallel"
                    bat 'npm run "e2e:parallel"'
                }
            }
        }
    }
}