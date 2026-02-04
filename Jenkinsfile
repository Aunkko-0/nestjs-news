pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io"
        IMAGE_BACKEND = "aunkko-0/nestjs-news-backend"
        IMAGE_FRONTEND = "aunkko-0/nestjs-news-frontend"
        // ⚠️ เช็คใน Jenkins > Credentials ว่าตั้ง ID เป็นชื่อนี้จริงไหม
        CREDENTIALS_ID = 'nestjs-news' 
    }

    stages {
        stage('1. Checkout Source') {
            steps {
                checkout scm
            }
        }
        
        stage('Debug') {
            steps {
                script {
                    sh "whoami"      // ดูว่าเป็น user อะไร
                    sh "echo $PATH"  // ดูว่า path มี /usr/bin ไหม
                    sh "ls -l /var/run/docker.sock" // ดูว่ามองเห็น socket ไหม
                }
            }
        }
    }

        stage('2. Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${env.CREDENTIALS_ID}", passwordVariable: 'GHCR_PAT', usernameVariable: 'GHCR_USER')]) {
                    sh 'echo $GHCR_PAT | docker login $REGISTRY -u $GHCR_USER --password-stdin'
                }
            }
        }

        stage('3. Build & Push Backend') {
            steps {
                script {
                    echo "🚀 Building Backend..."
                    sh "docker build -t $REGISTRY/$IMAGE_BACKEND:latest ./backend-api"
                    
                    echo "☁️ Pushing Backend..."
                    sh "docker push $REGISTRY/$IMAGE_BACKEND:latest"
                }
            }
        }

        stage('4. Build & Push Frontend') {
            steps {
                script {
                    echo "🎨 Building Frontend..."
                    // ✅ แก้ IP ให้เรียบร้อยแล้วครับ
                    sh """
                        docker build \
                        --build-arg VITE_API_URL=http://34.236.144.32:3000 \
                        -t $REGISTRY/$IMAGE_FRONTEND:latest ./frontend-web
                    """
                    
                    echo "☁️ Pushing Frontend..."
                    sh "docker push $REGISTRY/$IMAGE_FRONTEND:latest"
                }
            }
        }
    }

    post {
        always {
            // ลบ Image ทิ้งหลังจบงาน เพื่อไม่ให้เปลืองพื้นที่ Disk
            sh "docker rmi $REGISTRY/$IMAGE_BACKEND:latest || true"
            sh "docker rmi $REGISTRY/$IMAGE_FRONTEND:latest || true"
            cleanWs()
        }
        success {
            echo "✅ Successfully built and pushed both services!"
        }
    }
}