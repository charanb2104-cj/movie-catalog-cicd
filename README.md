# Movie Picture Catalog CI/CD Pipeline

A complete CI/CD solution using **GitHub Actions**, **Amazon EKS**, and **Amazon ECR** for a multi-tier web application (React frontend + Python/Flask backend).

---

## 📁 Repository Structure

```text
movie-catalog-cicd/
├── .github/
│   └── workflows/
│       ├── frontend-ci.yaml      # CI: Pull requests to main (starter/frontend/**)
│       ├── backend-ci.yaml       # CI: Pull requests to main (starter/backend/**)
│       ├── frontend-cd.yaml      # CD: Push/Merge to main (starter/frontend/**)
│       └── backend-cd.yaml       # CD: Push/Merge to main (starter/backend/**)
├── starter/
│   ├── frontend/
│   │   ├── Dockerfile            # Multi-stage Docker build
│   │   ├── package.json          # React dependencies & scripts (lint, test, build)
│   │   ├── .eslintrc.json        # ESLint config
│   │   ├── public/
│   │   ├── src/                  # App.js, MovieList.js, and unit tests
│   │   └── k8s/                  # deployment.yaml, service.yaml, kustomization.yaml
│   └── backend/
│       ├── Dockerfile            # Python 3.10 slim container
│       ├── Pipfile               # Flask, pytest, flake8
│       ├── app.py                # /movies endpoint
│       ├── test_app.py           # 3 unit tests
│       ├── .flake8               # Linter config
│       └── k8s/                  # deployment.yaml, service.yaml, kustomization.yaml
├── setup/
│   ├── init.sh                   # AWS IAM Authenticator script for aws-auth ConfigMap
│   └── terraform/                # Infrastructure (VPC, EKS Cluster, ECR repos)
├── .gitignore
└── README.md
```

---

## 🚀 Step 1: Push Project to Your Personal GitHub Repository

1. Open PowerShell or Terminal inside this folder:
   ```bash
   cd C:\Users\Charan\Desktop\movie-catalog-cicd
   ```
2. Initialize Git and make the initial commit:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit: Complete CI/CD starter setup"
   ```
3. Create a **new repository** on your GitHub account (e.g. `movie-catalog-cicd`).
4. Link and push your code:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/movie-catalog-cicd.git
   git push -u origin main
   ```

---

## ☁️ Step 2: Deploy AWS Infrastructure (Terraform)

1. Ensure AWS CLI credentials with admin permissions are exported in your terminal:
   ```bash
   export AWS_ACCESS_KEY_ID="<YOUR_ADMIN_ACCESS_KEY>"
   export AWS_SECRET_ACCESS_KEY="<YOUR_ADMIN_SECRET_KEY>"
   export AWS_DEFAULT_REGION="us-east-1"
   ```
2. Navigate to `setup/terraform` and run Terraform:
   ```bash
   cd setup/terraform
   terraform init
   terraform apply --auto-approve
   ```
3. Note the output values:
   ```bash
   terraform output
   ```
   Save the repository URLs:
   - `ecr_frontend_repository_url` (e.g., `<ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/mp-frontend`)
   - `ecr_backend_repository_url` (e.g., `<ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/mp-backend`)

---

## 🔑 Step 3: Configure EKS Cluster & IAM Authenticator

1. Update your local kubeconfig to connect to the EKS cluster:
   ```bash
   aws eks update-kubeconfig --name cluster --region us-east-1
   kubectl get nodes
   ```
2. In AWS Console > IAM, locate the user `github-action-user` (or create one) and create an Access Key for it.
3. Authorize this user inside Kubernetes by running `init.sh`:
   ```bash
   cd ../setup
   chmod +x init.sh
   ./init.sh
   ```

---

## 🔒 Step 4: Configure GitHub Repository Secrets

In your GitHub repository, navigate to **Settings > Secrets and variables > Actions > New repository secret** and add:

| Secret Name | Value | Purpose |
| :--- | :--- | :--- |
| `AWS_ACCESS_KEY_ID` | `AKIA...` | Access Key of `github-action-user` |
| `AWS_SECRET_ACCESS_KEY` | `wJalr...` | Secret Key of `github-action-user` |
| `AWS_DEFAULT_REGION` | `us-east-1` | AWS deployment region |
| `REACT_APP_MOVIE_API_URL` | `http://<BACKEND_LOAD_BALANCER_URL>:5000` | Backend API URL reachable by the frontend |

---

## 📸 Step 5: Rubric Submission & Screenshot Checklist

To achieve a **100% PASS** on the rubric, capture and include the following screenshots in your submission document:

### 1. Frontend CI (`frontend-ci.yaml`)
- Create a feature branch: `git checkout -b feature/frontend-update`
- Make a trivial change in `starter/frontend/src/App.js`.
- Open a Pull Request targeting `main`.
- **Screenshot**: GitHub Actions showing `Frontend Continuous Integration` with `lint` and `test` running in parallel, followed by `build`.

### 2. Backend CI (`backend-ci.yaml`)
- Create a feature branch: `git checkout -b feature/backend-update`
- Make a trivial comment in `starter/backend/app.py`.
- Open a Pull Request targeting `main`.
- **Screenshot**: GitHub Actions showing `Backend Continuous Integration` with `lint` and `test` passing, followed by `build`.

### 3. Failure Simulation (Mandatory Rubric Proof)
- In a branch, edit `starter/backend/test_app.py`:
  Change `assert response.status_code == 200` to `assert response.status_code == 500`.
- Push and open a PR.
- **Screenshot**: The workflow failing at the `Run tests` step and preventing the build step.
- Revert the change once photographed.

### 4. Frontend & Backend CD Workflows
- Merge your PRs into `main` (or run manually via `workflow_dispatch`).
- **Screenshot**: `Frontend Continuous Deployment` and `Backend Continuous Deployment` completing successfully.

### 5. Amazon ECR Repositories
- Open the AWS Console > Amazon ECR.
- **Screenshot**: Images in `mp-frontend` and `mp-backend` tagged with the Git commit SHA.

### 6. Kubernetes Cluster Status
- Run in terminal:
  ```bash
  kubectl get all -n default
  ```
- **Screenshot**: Terminal showing running frontend and backend pods, services, and deployments.

### 7. Working Application in Browser
- Open your browser to the Frontend LoadBalancer URL (or port-forward `kubectl port-forward svc/frontend 3000:80`).
- **Screenshot**: The Movie Picture Catalog web page displaying the list of movies loaded from the backend API.
- Test backend directly via curl:
  ```bash
  curl http://<BACKEND_URL>:5000/movies
  ```
  **Screenshot**: Terminal returning JSON: `{"movies":[{"id":"123","title":"Top Gun: Maverick"}, ...]}`.

---

## 🧹 Step 6: Teardown / Cleanup

To avoid depleting AWS credits once screenshots are saved:
```bash
cd setup/terraform
terraform destroy --auto-approve
```
