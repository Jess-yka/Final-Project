package org.launchcode.hipsterhack.repository.search;

import org.launchcode.hipsterhack.domain.Grades;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Grades} entity.
 */
public interface GradesSearchRepository extends ElasticsearchRepository<Grades, Long> {
}
