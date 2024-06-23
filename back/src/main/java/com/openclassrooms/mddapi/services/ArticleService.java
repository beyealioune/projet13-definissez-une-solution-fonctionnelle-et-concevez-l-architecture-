package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.Dtos.ArticleDTO;
import com.openclassrooms.mddapi.entities.Article;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public ArticleDTO createArticle(ArticleDTO articleDTO) {
        Article article = articleDTO.toModel();
        Article savedArticle = articleRepository.save(article);
        return ArticleDTO.fromModel(savedArticle);
    }

    public List<ArticleDTO> getAllArticles() {
        return articleRepository.findAll().stream().map(ArticleDTO::fromModel).collect(Collectors.toList());
    }

    public List<ArticleDTO> getArticlesByTheme(Long themeId) {
        return articleRepository.findByThemeId(themeId).stream().map(ArticleDTO::fromModel).collect(Collectors.toList());
    }

    public List<ArticleDTO> getSubscribedArticles(Long userId) {
        return subscriptionRepository.findByUserId(userId).stream()
                .map(subscription -> ArticleDTO.fromModel(subscription.getArticle()))
                .collect(Collectors.toList());
    }

    public ArticleDTO getArticleById(Long articleId) {
        Optional<Article> article = articleRepository.findById(articleId);
        return article.map(ArticleDTO::fromModel).orElse(null);
    }
}
