pipeline {
    agent any
    stages {
        stage ('Verify build') {
            echo "Current working branch: $GIT_BRANCH"
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