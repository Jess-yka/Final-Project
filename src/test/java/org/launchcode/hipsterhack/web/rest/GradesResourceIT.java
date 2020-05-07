package org.launchcode.hipsterhack.web.rest;

import org.launchcode.hipsterhack.HipsterhackApp;
import org.launchcode.hipsterhack.domain.Grades;
import org.launchcode.hipsterhack.repository.GradesRepository;
import org.launchcode.hipsterhack.repository.search.GradesSearchRepository;
import org.launchcode.hipsterhack.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.launchcode.hipsterhack.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.launchcode.hipsterhack.domain.enumeration.GradesEnum;
/**
 * Integration tests for the {@link GradesResource} REST controller.
 */
@SpringBootTest(classes = HipsterhackApp.class)
public class GradesResourceIT {

    private static final GradesEnum DEFAULT_GRADES = GradesEnum.GRADEK1;
    private static final GradesEnum UPDATED_GRADES = GradesEnum.GRADE23;

    @Autowired
    private GradesRepository gradesRepository;

    /**
     * This repository is mocked in the org.launchcode.hipsterhack.repository.search test package.
     *
     * @see org.launchcode.hipsterhack.repository.search.GradesSearchRepositoryMockConfiguration
     */
    @Autowired
    private GradesSearchRepository mockGradesSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restGradesMockMvc;

    private Grades grades;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GradesResource gradesResource = new GradesResource(gradesRepository, mockGradesSearchRepository);
        this.restGradesMockMvc = MockMvcBuilders.standaloneSetup(gradesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Grades createEntity(EntityManager em) {
        Grades grades = new Grades()
            .grades(DEFAULT_GRADES);
        return grades;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Grades createUpdatedEntity(EntityManager em) {
        Grades grades = new Grades()
            .grades(UPDATED_GRADES);
        return grades;
    }

    @BeforeEach
    public void initTest() {
        grades = createEntity(em);
    }

    @Test
    @Transactional
    public void createGrades() throws Exception {
        int databaseSizeBeforeCreate = gradesRepository.findAll().size();

        // Create the Grades
        restGradesMockMvc.perform(post("/api/grades")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grades)))
            .andExpect(status().isCreated());

        // Validate the Grades in the database
        List<Grades> gradesList = gradesRepository.findAll();
        assertThat(gradesList).hasSize(databaseSizeBeforeCreate + 1);
        Grades testGrades = gradesList.get(gradesList.size() - 1);
        assertThat(testGrades.getGrades()).isEqualTo(DEFAULT_GRADES);

        // Validate the Grades in Elasticsearch
        verify(mockGradesSearchRepository, times(1)).save(testGrades);
    }

    @Test
    @Transactional
    public void createGradesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gradesRepository.findAll().size();

        // Create the Grades with an existing ID
        grades.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGradesMockMvc.perform(post("/api/grades")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grades)))
            .andExpect(status().isBadRequest());

        // Validate the Grades in the database
        List<Grades> gradesList = gradesRepository.findAll();
        assertThat(gradesList).hasSize(databaseSizeBeforeCreate);

        // Validate the Grades in Elasticsearch
        verify(mockGradesSearchRepository, times(0)).save(grades);
    }


    @Test
    @Transactional
    public void getAllGrades() throws Exception {
        // Initialize the database
        gradesRepository.saveAndFlush(grades);

        // Get all the gradesList
        restGradesMockMvc.perform(get("/api/grades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grades.getId().intValue())))
            .andExpect(jsonPath("$.[*].grades").value(hasItem(DEFAULT_GRADES.toString())));
    }
    
    @Test
    @Transactional
    public void getGrades() throws Exception {
        // Initialize the database
        gradesRepository.saveAndFlush(grades);

        // Get the grades
        restGradesMockMvc.perform(get("/api/grades/{id}", grades.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(grades.getId().intValue()))
            .andExpect(jsonPath("$.grades").value(DEFAULT_GRADES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGrades() throws Exception {
        // Get the grades
        restGradesMockMvc.perform(get("/api/grades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGrades() throws Exception {
        // Initialize the database
        gradesRepository.saveAndFlush(grades);

        int databaseSizeBeforeUpdate = gradesRepository.findAll().size();

        // Update the grades
        Grades updatedGrades = gradesRepository.findById(grades.getId()).get();
        // Disconnect from session so that the updates on updatedGrades are not directly saved in db
        em.detach(updatedGrades);
        updatedGrades
            .grades(UPDATED_GRADES);

        restGradesMockMvc.perform(put("/api/grades")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGrades)))
            .andExpect(status().isOk());

        // Validate the Grades in the database
        List<Grades> gradesList = gradesRepository.findAll();
        assertThat(gradesList).hasSize(databaseSizeBeforeUpdate);
        Grades testGrades = gradesList.get(gradesList.size() - 1);
        assertThat(testGrades.getGrades()).isEqualTo(UPDATED_GRADES);

        // Validate the Grades in Elasticsearch
        verify(mockGradesSearchRepository, times(1)).save(testGrades);
    }

    @Test
    @Transactional
    public void updateNonExistingGrades() throws Exception {
        int databaseSizeBeforeUpdate = gradesRepository.findAll().size();

        // Create the Grades

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGradesMockMvc.perform(put("/api/grades")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(grades)))
            .andExpect(status().isBadRequest());

        // Validate the Grades in the database
        List<Grades> gradesList = gradesRepository.findAll();
        assertThat(gradesList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Grades in Elasticsearch
        verify(mockGradesSearchRepository, times(0)).save(grades);
    }

    @Test
    @Transactional
    public void deleteGrades() throws Exception {
        // Initialize the database
        gradesRepository.saveAndFlush(grades);

        int databaseSizeBeforeDelete = gradesRepository.findAll().size();

        // Delete the grades
        restGradesMockMvc.perform(delete("/api/grades/{id}", grades.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Grades> gradesList = gradesRepository.findAll();
        assertThat(gradesList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Grades in Elasticsearch
        verify(mockGradesSearchRepository, times(1)).deleteById(grades.getId());
    }

    @Test
    @Transactional
    public void searchGrades() throws Exception {
        // Initialize the database
        gradesRepository.saveAndFlush(grades);
        when(mockGradesSearchRepository.search(queryStringQuery("id:" + grades.getId())))
            .thenReturn(Collections.singletonList(grades));
        // Search the grades
        restGradesMockMvc.perform(get("/api/_search/grades?query=id:" + grades.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(grades.getId().intValue())))
            .andExpect(jsonPath("$.[*].grades").value(hasItem(DEFAULT_GRADES.toString())));
    }
}
