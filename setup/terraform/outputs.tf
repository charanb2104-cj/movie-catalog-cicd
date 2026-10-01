output "ecr_frontend_repository_url" {
  description = "URL of the Frontend ECR repository"
  value       = aws_ecr_repository.frontend.repository_url
}

output "ecr_backend_repository_url" {
  description = "URL of the Backend ECR repository"
  value       = aws_ecr_repository.backend.repository_url
}

output "cluster_name" {
  description = "EKS Cluster Name"
  value       = aws_eks_cluster.cluster.name
}

output "cluster_endpoint" {
  description = "Endpoint for EKS control plane"
  value       = aws_eks_cluster.cluster.endpoint
}
