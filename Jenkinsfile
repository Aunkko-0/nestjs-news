pipeline {
    agent any

    environment {
        REGISTRY = "ghcr.io"
        IMAGE_BACKEND = "aunkko-0/nestjs-news-backend"
        IMAGE_FRONTEND = "aunkko-0/nestjs-news-frontend"
        CREDENTIALS_ID = 'nestjs'
    }

    stages {
        stage('1. Checkout Source') {
            steps {
                checkout scm
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
                    // คำสั่งนี้จะเข้าไปอ่าน Dockerfile ในโฟลเดอร์ backend-api และใช้ไฟล์ในนั้น
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
                    // อย่าลืมแก้ IP ตรงนี้ให้เป็นของจริง
                    sh """
                        docker build \
                        --build-arg VITE_API_URL=http://ไอพี_server_จริง:3000 \
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
            // ลบ Image ทิ้งหลังจบงาน
            sh "docker rmi $REGISTRY/$IMAGE_BACKEND:latest || true"
            sh "docker rmi $REGISTRY/$IMAGE_FRONTEND:latest || true"
            cleanWs()
        }
        success {
            echo "✅ Successfully built and pushed both services!"
        }
    }
}